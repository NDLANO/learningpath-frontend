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

import { deleteLearningPathStep } from '../learningPathStepActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const authToken = '123345';
const pathId = 123;
const stepId = 321;

test('actions/deleteLearningPathStep with id', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  // GET /learningpaths/:pathId
  nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get(`/learningpaths/${pathId}`)
    .reply(200, { id: pathId });

  // DELETE /learningpaths/:pathId/learningsteps/:stepId
  nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .delete(`/learningpaths/${pathId}/learningsteps/${stepId}`)
    .reply(204);


  const store = mockStore({ authToken });
  store.dispatch(deleteLearningPathStep(pathId, stepId))
    .then(() => {
      t.equal(store.getActions().length, 4);
      t.equal(store.getActions()[0].type, 'ADD_MESSAGE', 'action type is ADD_MESSAGE');
      t.ok(store.getActions()[0].payload.action, 'ADD_MESSAGE payload contains action');
      t.deepEqual(store.getActions()[1],
        { type: 'SET_LEARNING_PATH', payload: { id: pathId } }
      );

      t.doesNotThrow(() => nock.isDone());
      done();
    })
    .catch(done);
});
