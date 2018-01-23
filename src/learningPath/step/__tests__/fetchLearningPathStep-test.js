/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { routerActions } from 'react-router-redux';
import payload403invalid from '../../../actions/__tests__/payload403invalid';

import { applicationError } from '../../../messages/messagesActions';
import {
  setLearningPathStep,
  fetchLearningPathStep,
} from '../learningPathStepActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const accessToken = '123345';
const pathId = 123;
const stepId = 456;

test('actions/fetchLearningPathStep', () => {
  const done = res => {
    done(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', {
    reqheaders: { Authorization: `Bearer ${accessToken}` },
  })
    .get(`/learningpath-api/v1/learningpaths/${pathId}/learningsteps/${stepId}`)
    .reply(200, { id: stepId, seqNo: 3 });

  const store = mockStore({ accessToken });

  store
    .dispatch(fetchLearningPathStep(pathId, stepId))
    .then(() => {
      expect(store.getActions()).toEqual([
        setLearningPathStep({ id: stepId, seqNo: 3 }),
      ]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(done);
});

test('actions/fetchLearningPathStep with isEdit true and canEdit false', () => {
  const done = res => {
    done(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', {
    reqheaders: { Authorization: `Bearer ${accessToken}` },
  })
    .get(`/learningpath-api/v1/learningpaths/${pathId}/learningsteps/${stepId}`)
    .reply(200, { id: stepId, seqNo: 3, canEdit: false });

  const store = mockStore({ accessToken });

  store
    .dispatch(fetchLearningPathStep(pathId, stepId, true))
    .then(() => {
      expect(store.getActions()).toEqual([
        setLearningPathStep({ id: stepId, seqNo: 3, canEdit: false }),
        routerActions.push({ pathname: '/forbidden' }),
      ]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(done);
});

test('actions/fetchLearningPathStep with isEdit true and canEdit true', () => {
  const done = res => {
    done(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', {
    reqheaders: { Authorization: `Bearer ${accessToken}` },
  })
    .get(`/learningpath-api/v1/learningpaths/${pathId}/learningsteps/${stepId}`)
    .reply(200, { id: stepId, seqNo: 3, canEdit: true });

  const store = mockStore({ accessToken });

  store
    .dispatch(fetchLearningPathStep(pathId, stepId, true))
    .then(() => {
      expect(store.getActions()).toEqual([
        setLearningPathStep({ id: stepId, seqNo: 3, canEdit: true }),
      ]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(done);
});

test('actions/fetchLearningPathStep cache hit', () => {
  const done = res => {
    done(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', {
    reqheaders: { Authorization: `Bearer ${accessToken}` },
  })
    .get(`/learningpath-api/v1/learningpaths/${pathId}/learningsteps/${stepId}`)
    .reply(200, { id: stepId, seqNo: 3, cached: false });

  const initialState = {
    learningPath: {
      id: pathId,
      learningsteps: [
        { id: 'not-stepId', seqNo: 2 },
        { id: stepId, seqNo: 3, cached: true },
      ],
    },
    accessToken,
  };

  const store = mockStore(initialState);

  store
    .dispatch(fetchLearningPathStep(pathId, stepId))
    .then(() => {
      expect(store.getActions()).toEqual([
        setLearningPathStep({ id: stepId, seqNo: 3, cached: true }),
        setLearningPathStep({ id: stepId, seqNo: 3, cached: false }),
      ]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(done);
});

test('actions/fetchLearningPathStep access denied', () => {
  const done = res => {
    done(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', {
    reqheaders: { Authorization: `Bearer ${accessToken}` },
  })
    .get(`/learningpath-api/v1/learningpaths/${pathId}/learningsteps/${stepId}`)
    .reply(403, { message: 'Invalid' });

  const store = mockStore({ accessToken });

  store
    .dispatch(fetchLearningPathStep(pathId, stepId))
    .then(() => {
      expect(store.getActions()).toEqual([
        applicationError(
          payload403invalid(
            `http://ndla-api/learningpath-api/v1/learningpaths/${pathId}/learningsteps/${stepId}`,
          ),
        ),
      ]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(done);
});

test('actions/fetchLearningPathStep with embedUrl', () => {
  const done = res => {
    done(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', {
    reqheaders: { Authorization: `Bearer ${accessToken}` },
  })
    .get(`/learningpath-api/v1/learningpaths/${pathId}/learningsteps/${stepId}`)
    .reply(200, {
      id: stepId,
      seqNo: 3,
      embedUrl: [{ url: 'test', language: 'nb', embedType: 'oembed' }],
    });

  const store = mockStore({ accessToken });

  store
    .dispatch(fetchLearningPathStep(pathId, stepId))
    .then(() => {
      expect(store.getActions()).toEqual([
        setLearningPathStep({
          id: stepId,
          seqNo: 3,
          embedUrl: [{ url: 'test', language: 'nb', embedType: 'oembed' }],
        }),
      ]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(done);
});
