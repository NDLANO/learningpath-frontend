import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import payload403invalid from './payload403invalid';

import actions from '..';

const middleware = [ thunk ];
const mockStore = configureStore(middleware);

const authToken = '123345';
const pathId = 123;
const stepId = 456;

test('actions/fetchPrivateLearningPathStep', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };
  
  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get(`/learningpaths/private/${pathId}/learningsteps/${stepId}`)
    .reply(200, {id: stepId, seqNo: 3});

  const store = mockStore({ authToken });

  store.dispatch( actions.fetchPrivateLearningPathStep(pathId, stepId) )
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.setLearningPathStep({id: stepId, seqNo: 3})
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});

test('actions/fetchPrivateLearningPathStep cache hit', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };
  
  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get(`/learningpaths/private/${pathId}/learningsteps/${stepId}`)
    .reply(200, {id: stepId, seqNo: 3, cached: false});

  const initialState = {
    learningPath: {
      id: pathId,
      learningsteps: [
        { id: 'not-stepId', seqNo: 2 },
        { id: stepId, seqNo: 3, cached: true }
      ]
    },
    authToken
  };

  const store = mockStore(initialState);

  store.dispatch( actions.fetchPrivateLearningPathStep(pathId, stepId) )
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.setLearningPathStep({id: stepId, seqNo: 3, cached: true}),
        actions.setLearningPathStep({id: stepId, seqNo: 3, cached: false})
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});

test('actions/fetchPrivateLearningPathStep access denied', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };
  
  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get(`/learningpaths/private/${pathId}/learningsteps/${stepId}`)
    .reply(403, {message: 'Invalid'});

  const store = mockStore({ authToken });

  store.dispatch( actions.fetchPrivateLearningPathStep(pathId, stepId) )
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.applicationError(payload403invalid())
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});
