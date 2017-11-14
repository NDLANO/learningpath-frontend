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

const middleware = [thunk];
const mockStore = configureStore(middleware);

const accessToken = '123345';
const pathId = 123;
const stepId = 321;

test('actions/deleteLearningPathStep with id', () => {
  const done = res => {
    done(res);
    nock.cleanAll();
  };

  // GET /learningpaths/:pathId
  nock('http://ndla-api', {
    reqheaders: { Authorization: `Bearer ${accessToken}` },
  })
    .get(`/learningpath-api/v1/learningpaths/${pathId}`)
    .reply(200, { id: pathId });

  // DELETE /learningpaths/:pathId/learningsteps/:stepId
  nock('http://ndla-api', {
    reqheaders: { Authorization: `Bearer ${accessToken}` },
  })
    .delete(
      `/learningpath-api/v1/learningpaths/${pathId}/learningsteps/${stepId}`,
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
    .catch(done);
});
