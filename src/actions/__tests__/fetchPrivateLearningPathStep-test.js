import test from 'tape';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import actions from '..';

const middleware = [ thunk ];
const mockStore = configureMockStore(middleware);

const authToken = '123345';
const pathId = 123;
const stepId = 456;

test('actions/fetchPrivateLearningPathStep', t => {
  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get(`/learningpaths/private/${pathId}/learningsteps/${stepId}`)
    .reply(200, {id: stepId, seqNo: 3});

  const expectedActions = [
    actions.setPrivateLearningPathStep({id: stepId, seqNo: 3})
  ];

  const store = mockStore({ authToken }, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.end(res);

    nock.cleanAll();
  });

  store.dispatch( actions.fetchPrivateLearningPathStep(pathId, stepId) );
});

test('actions/fetchPrivateLearningPathStep cache hit', t => {
  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get(`/learningpaths/private/${pathId}/learningsteps/${stepId}`)
    .reply(200, {id: stepId, seqNo: 3, cached: false});

  const initialState = {
    privateLearningPath: {
      id: pathId,
      learningsteps: [
        { id: 'not-stepId', seqNo: 2 },
        { id: stepId, seqNo: 3, cached: true }
      ]
    },
    authToken
  };

  const expectedActions = [
    actions.setPrivateLearningPathStep({id: stepId, seqNo: 3, cached: true}),
    actions.setPrivateLearningPathStep({id: stepId, seqNo: 3, cached: false})
  ];

  const store = mockStore(initialState, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.end(res);

    nock.cleanAll();
  });

  store.dispatch( actions.fetchPrivateLearningPathStep(pathId, stepId) );
});

test('actions/fetchPrivateLearningPathStep access denied', t => {
  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get(`/learningpaths/private/${pathId}/learningsteps/${stepId}`)
    .reply(403, {message: 'Invalid'});

  const expectedActions = [
    actions.applicationError(new Error('Invalid'))
  ];

  const store = mockStore({ authToken }, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.end(res);

    nock.cleanAll();
  });

  store.dispatch( actions.fetchPrivateLearningPathStep(pathId, stepId) );
});


