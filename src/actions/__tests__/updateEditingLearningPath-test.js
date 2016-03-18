import test from 'tape';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import payload403invalid from './payload403invalid';

import actions from '..';
import { routeActions } from 'redux-simple-router';

const middleware = [ thunk ];
const mockStore = configureMockStore(middleware);

const authToken = '123345';
const pathId = 123;

test('actions/updateEditingLearningPath', t => {
  const learningsteps = [
    { id: 34, seqNo: 1 },
    { id: 12, seqNo: 0 },
    { seqNo: 2 }
  ];

  const putPathApi = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .put('/learningpaths/' + pathId, {
      id: pathId, isRequest: true, learningsteps
    })
    .reply(200, {id: pathId, isResponse: true});

  const putStep1Api = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .put('/learningpaths/' + pathId + '/learningsteps/12', { id: 12, seqNo: 0 })
    .reply(200, {id: 12, seqNo: 0, isResponse: true});

  const putStep2Api = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .put('/learningpaths/' + pathId + '/learningsteps/34', { id: 34, seqNo: 1 })
    .reply(200, {id: 34, seqNo: 1, isResponse: true});

  const postStep3Api = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .post('/learningpaths/' + pathId + '/learningsteps', { seqNo: 2 })
    .reply(200, {id: 56, seqNo: 2, isResponse: true});

  const expectedActions = [
    actions.setEditingLearningPath({
      id: pathId,
      isResponse: true,
      learningsteps: [
        {id: 12, seqNo: 0, isResponse: true},
        {id: 34, seqNo: 1, isResponse: true},
        {id: 56, seqNo: 2, isResponse: true}
      ]
    }),
    routeActions.push({ pathname: `/learningpaths/private/${pathId}` })
  ];

  const store = mockStore({ authToken }, expectedActions, (res) => {
    t.doesNotThrow(() => putPathApi.done());
    t.doesNotThrow(() => putStep1Api.done());
    t.doesNotThrow(() => putStep2Api.done());
    t.doesNotThrow(() => postStep3Api.done());
    t.end(res);

    nock.cleanAll();
  });

  store.dispatch( actions.updateEditingLearningPath(pathId, {
    id: pathId, isRequest: true, learningsteps
  }) );
});

test('actions/updateEditingLearningPath access denied', (t) => {
  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .put('/learningpaths/' + pathId, {
      id: pathId,
      foo: 'bar'
    })
    .reply(403, {message: 'Invalid'});

  const expectedActions = [
    actions.applicationError(payload403invalid())
  ];

  const store = mockStore({ authToken }, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.end(res);

    nock.cleanAll();
  });

  store.dispatch( actions.updateEditingLearningPath(pathId, { id: pathId, foo: 'bar' }) );
});
