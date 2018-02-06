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
import { deleteLearningPathStep } from '../learningPathStepActions';
import { testError } from '../../../common/__tests__/testError';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const accessToken = '12345678';
const pathId = 123;
const stepId = 321;

test('actions/deleteLearningPathStep with id', done => {
  // GET /learningpaths/:pathId
  nock('http://ndla-api', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .get(`/learningpath-api/v2/learningpaths/${pathId}`)
    .reply(200, { id: pathId });

  // DELETE /learningpaths/:pathId/learningsteps/:stepId
  nock('http://ndla-api', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .delete(
      `/learningpath-api/v2/learningpaths/${pathId}/learningsteps/${stepId}`,
    )
    .reply(204);

  const store = mockStore({ accessToken });
  store
    .dispatch(deleteLearningPathStep(pathId, stepId))
    .then(() => {
      expect(store.getActions().length).toBe(4);
      expect(store.getActions()[0].type).toBe('ADD_MESSAGE');
      expect(store.getActions()[0].payload.action).toBeTruthy();
      expect(store.getActions()[1]).toEqual({
        type: 'SET_LEARNING_PATH',
        payload: { id: pathId },
      });

      expect(() => nock.isDone()).not.toThrow();
      done();
    })
    .catch(testError);
});
