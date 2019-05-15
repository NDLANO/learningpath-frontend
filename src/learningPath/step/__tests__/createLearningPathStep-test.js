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
import { testError } from '../../../common/__tests__/testError';
import {
  applicationError,
  addMessage,
} from '../../../messages/messagesActions';
import { createLearningPathStep } from '../learningPathStepActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const accessToken = '12345678';
const pathId = 123;

test('actions/createLearningPathStep', done => {
  const learningStep = {
    title: [{ language: 'nb', title: 'Goat' }],
    description: [{ language: 'nb', description: 'this is a description' }],
    embedUrl: [
      { language: 'nb', url: 'https://www.youtube.com/watch?v=ggB33d0BLcY' },
    ],
  };

  const learningStepReply = Object.assign({}, learningStep, { id: 1234 });

  const postPathStepApi = nock('http://ndla-api', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .post(
      `/learningpath-api/v2/learningpaths/${pathId}/learningsteps/`,
      learningStep,
    )
    .reply(200, learningStepReply);

  const store = mockStore({ accessToken });

  store
    .dispatch(createLearningPathStep(pathId, learningStep))
    .then(() => {
      expect(store.getActions()).toEqual([
        addMessage({ message: 'Lagret OK' }),
        routerActions.push({ pathname: `/learningpaths/${pathId}/step/1234` }),
      ]);

      expect(() => postPathStepApi.done()).not.toThrow();
      done();
    })
    .catch(testError);
});

test('actions/createLearningPathStep access denied', done => {
  const learningStep = {
    title: [{ language: 'nb', title: 'Goat' }],
    description: [{ language: 'nb', description: 'this is a description' }],
    embedUrl: [
      { language: 'nb', url: 'https://www.youtube.com/watch?v=ggB33d0BLcY' },
    ],
  };

  const apiMock = nock('http://ndla-api', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .post(
      `/learningpath-api/v2/learningpaths/${pathId}/learningsteps/`,
      learningStep,
    )
    .reply(403, { message: 'Invalid' });

  const store = mockStore({ accessToken });

  store
    .dispatch(createLearningPathStep(pathId, learningStep))
    .then(() => {
      expect(store.getActions()).toEqual([
        applicationError(
          payload403invalid(
            `http://ndla-api/learningpath-api/v1/learningpaths/${pathId}/learningsteps/`,
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
    })
    .catch(testError);
});
