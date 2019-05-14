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
import payload403invalid from '../../actions/__tests__/payload403invalid';
import { applicationError, addMessage } from '../../messages/messagesActions';
import { createLearningPath, setLearningPath } from '../learningPathActions';
import { createEmptyLearningPathStep } from '../step/learningPathStepActions';
import { testError } from '../../common/__tests__/testError';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const accessToken = '12345678';
const pathId = 123;

test('actions/createLearningPath', done => {
  const learningsteps = [{ seqNo: 1 }, { seqNo: 0 }, { seqNo: 2 }];

  const postPathApi = nock('http://ndla-api', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .post('/learningpath-api/v2/learningpaths/', {
      isRequest: true,
      learningsteps,
    })
    .reply(200, { id: pathId, isResponse: true });

  const postStep1Api = nock('http://ndla-api', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .post(`/learningpath-api/v2/learningpaths/${pathId}/learningsteps/`, {
      seqNo: 0,
    })
    .reply(200, { id: 12, seqNo: 0, isResponse: true });

  const postStep2Api = nock('http://ndla-api', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .post(`/learningpath-api/v2/learningpaths/${pathId}/learningsteps/`, {
      seqNo: 1,
    })
    .reply(200, { id: 34, seqNo: 1, isResponse: true });

  const postStep3Api = nock('http://ndla-api', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .post(`/learningpath-api/v2/learningpaths/${pathId}/learningsteps/`, {
      seqNo: 2,
    })
    .reply(200, { id: 56, seqNo: 2, isResponse: true });

  const store = mockStore({ accessToken });

  store
    .dispatch(createLearningPath({ isRequest: true, learningsteps }))
    .then(() => {
      expect(store.getActions()).toEqual([
        addMessage({ message: 'Lagret OK' }),
        setLearningPath({
          id: pathId,
          isResponse: true,
          learningsteps: [
            { id: 12, seqNo: 0, isResponse: true },
            { id: 34, seqNo: 1, isResponse: true },
            { id: 56, seqNo: 2, isResponse: true },
          ],
        }),
        createEmptyLearningPathStep(),
        routerActions.push({ pathname: `/learningpaths/${pathId}/step/new` }),
      ]);

      expect(() => postPathApi.done()).not.toThrow();
      expect(() => postStep1Api.done()).not.toThrow();
      expect(() => postStep2Api.done()).not.toThrow();
      expect(() => postStep3Api.done()).not.toThrow();
      done();
    })
    .catch(testError);
});

test('actions/createLearningPath access denied', done => {
  const apiMock = nock('http://ndla-api', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .post('/learningpath-api/v2/learningpaths/', {
      foo: 'bar',
    })
    .reply(403, { message: 'Invalid' });

  const store = mockStore({ accessToken });

  store
    .dispatch(createLearningPath({ foo: 'bar' }))
    .then(() => {
      testError('Should not be here');
    })
    .catch(() => {
      expect(store.getActions()).toEqual([
        applicationError(
          payload403invalid(
            'http://ndla-api/learningpath-api/v2/learningpaths/',
          ),
        ),
        {
          payload: {
            message: 'Du har ikke tilgang til dette akkurat nå',
            severity: 'danger',
            timeToLive: 10000,
          },
          type: 'ADD_MESSAGE',
        },
      ]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    });
});
