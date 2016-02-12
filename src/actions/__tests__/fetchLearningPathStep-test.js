import test from 'tape';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import actions from '..';

const middleware = [ thunk ];
const mockStore = configureMockStore(middleware);

const pathId = 123;
const stepId = 456;

test('actions/fetchLearningPathStep', t => {
  const apiMock = nock('http://ndla-api')
    .get(`/learningpaths/${pathId}/step/${stepId}`)
    .reply(200, {id: stepId, seqNo: 3});

  const expectedActions = [
    actions.setLearningPathStep({id: stepId, seqNo: 3})
  ];

  const store = mockStore({}, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.end(res);

    nock.cleanAll();
  });

  store.dispatch( actions.fetchLearningPathStep(pathId, stepId) );
});

test('actions/fetchLearningPathStep cache hit', t => {
  const apiMock = nock('http://ndla-api')
    .get(`/learningpaths/${pathId}/step/${stepId}`)
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

  const expectedActions = [
    actions.setLearningPathStep({id: stepId, seqNo: 3, cached: true}),
    actions.setLearningPathStep({id: stepId, seqNo: 3, cached: false})
  ];

  const store = mockStore(initialState, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.end(res);

    nock.cleanAll();
  });

  store.dispatch( actions.fetchLearningPathStep(pathId, stepId) );
});

test('actions/fetchLearningPathStep access denied', t => {
  const apiMock = nock('http://ndla-api')
    .get(`/learningpaths/${pathId}/step/${stepId}`)
    .reply(403, {message: 'Invalid'});

  const expectedActions = [
    actions.applicationError(new Error('Invalid'))
  ];

  const store = mockStore({}, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.end(res);

    nock.cleanAll();
  });

  store.dispatch( actions.fetchLearningPathStep(pathId, stepId) );
});
