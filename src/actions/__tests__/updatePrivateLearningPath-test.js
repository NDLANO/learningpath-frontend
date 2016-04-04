import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import payload403invalid from './payload403invalid';

import actions from '..';
import { routeActions } from 'redux-simple-router';

const middleware = [ thunk ];
const mockStore = configureStore(middleware);

const authToken = '123345';
const pathId = 123;

test('actions/updatePrivateLearningPath', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

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

  const store = mockStore({ authToken });

  store.dispatch( actions.updatePrivateLearningPath(pathId, {
    id: pathId, isRequest: true, learningsteps
  }) )
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.addMessage({message: 'Lagret OK'}),
        actions.setLearningPath({
          id: pathId,
          isResponse: true,
          learningsteps: [
            {id: 12, seqNo: 0, isResponse: true},
            {id: 34, seqNo: 1, isResponse: true},
            {id: 56, seqNo: 2, isResponse: true}
          ]
        }),
        routeActions.push({ pathname: `/learningpaths/private/${pathId}` })
      ]);

      t.doesNotThrow(() => putPathApi.done());
      t.doesNotThrow(() => putStep1Api.done());
      t.doesNotThrow(() => putStep2Api.done());
      t.doesNotThrow(() => postStep3Api.done());

      done();
    })
    .catch(done);
});

test('actions/updatePrivateLearningPath access denied', (t) => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .put('/learningpaths/' + pathId, {
      id: pathId,
      foo: 'bar'
    })
    .reply(403, {message: 'Invalid'});

  const store = mockStore({ authToken });

  store.dispatch( actions.updatePrivateLearningPath(pathId, { id: pathId, foo: 'bar' }) )
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.applicationError(payload403invalid())
      ]);
      t.doesNotThrow(() => apiMock.done());

      done();
    })
    .catch(done);
});
