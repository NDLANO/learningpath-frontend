/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import payload403invalid from '../../../actions/__tests__/payload403invalid';

import { applicationError } from '../../../messages/messagesActions';
import { setLearningPathStep, fetchLearningPathStep } from '../learningPathStepActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const authToken = '123345';
const pathId = 123;
const stepId = 456;

test('actions/fetchLearningPathStep', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get(`/learningpaths/${pathId}/learningsteps/${stepId}`)
    .reply(200, { id: stepId, seqNo: 3 });

  const store = mockStore({ authToken });

  store.dispatch(fetchLearningPathStep(pathId, stepId))
    .then(() => {
      t.deepEqual(store.getActions(), [
        setLearningPathStep({ id: stepId, seqNo: 3 }),
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});

test('actions/fetchLearningPathStep cache hit', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get(`/learningpaths/${pathId}/learningsteps/${stepId}`)
    .reply(200, { id: stepId, seqNo: 3, cached: false });

  const initialState = {
    learningPath: {
      id: pathId,
      learningsteps: [
        { id: 'not-stepId', seqNo: 2 },
        { id: stepId, seqNo: 3, cached: true },
      ],
    },
    authToken,
  };

  const store = mockStore(initialState);

  store.dispatch(fetchLearningPathStep(pathId, stepId))
    .then(() => {
      t.deepEqual(store.getActions(), [
        setLearningPathStep({ id: stepId, seqNo: 3, cached: true }),
        setLearningPathStep({ id: stepId, seqNo: 3, cached: false }),
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});

test('actions/fetchLearningPathStep access denied', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get(`/learningpaths/${pathId}/learningsteps/${stepId}`)
    .reply(403, { message: 'Invalid' });

  const store = mockStore({ authToken });

  store.dispatch(fetchLearningPathStep(pathId, stepId))
    .then(() => {
      t.deepEqual(store.getActions(), [
        applicationError(payload403invalid()),
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});

test('actions/fetchLearningPathStep with embedUrl', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get(`/learningpaths/${pathId}/learningsteps/${stepId}`)
    .reply(200, { id: stepId, seqNo: 3, embedUrl: [{ url: 'test', language: 'nb' }] });

  const store = mockStore({ authToken });

  store.dispatch(fetchLearningPathStep(pathId, stepId))
    .then(() => {
      t.deepEqual(store.getActions(), [
        setLearningPathStep({ id: stepId, seqNo: 3, embedUrl: [{ url: 'test', language: 'nb' }] }),
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});
