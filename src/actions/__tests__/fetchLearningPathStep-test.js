import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import payload403invalid from './payload403invalid';

import actions from '..';

const middleware = [ thunk ];
const mockStore = configureStore(middleware);

const pathId = 123;
const stepId = 456;

test('actions/fetchLearningPathStep', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };
  
  const apiMock = nock('http://ndla-api')
    .get(`/learningpaths/${pathId}/learningsteps/${stepId}`)
    .reply(200, {id: stepId, seqNo: 3});

  const store = mockStore({});

  store.dispatch( actions.fetchLearningPathStep(pathId, stepId) )
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.setLearningPathStep({id: stepId, seqNo: 3})
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});

test('actions/fetchLearningPathStep cache hit', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };
  
  const apiMock = nock('http://ndla-api')
    .get(`/learningpaths/${pathId}/learningsteps/${stepId}`)
    .reply(200, {id: stepId, seqNo: 3, cached: false});

  const initialState = {
    learningPath: {
      id: pathId,
      learningsteps: [
        { id: 'not-stepId', seqNo: 2 },
        { id: stepId, seqNo: 3, cached: true }
      ]
    }
  };

  const store = mockStore(initialState);

  store.dispatch( actions.fetchLearningPathStep(pathId, stepId) )
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

test('actions/fetchLearningPathStep access denied', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };
  
  const apiMock = nock('http://ndla-api')
    .get(`/learningpaths/${pathId}/learningsteps/${stepId}`)
    .reply(403, {message: 'Invalid'});

  const store = mockStore({});

  store.dispatch( actions.fetchLearningPathStep(pathId, stepId) )
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.applicationError(payload403invalid())
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});
