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

test('actions/createPrivateLearningPath', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const learningsteps = [
    { seqNo: 1 },
    { seqNo: 0 },
    { seqNo: 2 }
  ];

  const postPathApi = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .post('/learningpaths', { isRequest: true, learningsteps })
    .reply(200, {id: pathId, isResponse: true});

  const postStep1Api = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .post('/learningpaths/' + pathId + '/learningsteps', { seqNo: 0 })
    .reply(200, {id: 12, seqNo: 0, isResponse: true});

  const postStep2Api = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .post('/learningpaths/' + pathId + '/learningsteps', { seqNo: 1 })
    .reply(200, {id: 34, seqNo: 1, isResponse: true});

  const postStep3Api = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .post('/learningpaths/' + pathId + '/learningsteps', { seqNo: 2 })
    .reply(200, {id: 56, seqNo: 2, isResponse: true});

  const store = mockStore({ authToken });

  store.dispatch(
    actions.createPrivateLearningPath({ isRequest: true, learningsteps })
  )
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.addMessage({message: "Lagret OK"}),
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

      t.doesNotThrow(() => postPathApi.done());
      t.doesNotThrow(() => postStep1Api.done());
      t.doesNotThrow(() => postStep2Api.done());
      t.doesNotThrow(() => postStep3Api.done());

      done();
    })
    .catch(done);
});

test('actions/createPrivateLearningPath access denied', (t) => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .post('/learningpaths', {
      foo: 'bar'
    })
    .reply(403, {message: 'Invalid'});

  const store = mockStore({ authToken });

  store.dispatch( actions.createPrivateLearningPath({ foo: 'bar' }) )
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.applicationError(payload403invalid())
      ]);
      t.doesNotThrow(() => apiMock.done());

      done();
    })
    .catch(done);
});
