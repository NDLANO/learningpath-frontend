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

import { deleteLearningPath } from '../learningPathActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const accessToken = '123345';

test('actions/deleteLearningPath', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': accessToken } })
    .delete('/learningpath-api/v1/learningpaths/123')
    .reply(204);

  const store = mockStore({ accessToken });

  store.dispatch(deleteLearningPath({ id: 123, status: 'PRIVATE' }))
    .then(() => {
      t.deepEqual(store.getActions()[0], { type: 'REMOVE_LEARNING_PATH', payload: 123 });
      t.equal(store.getActions()[1].type, 'ADD_MESSAGE', 'action type is ADD_MESSAGE');
      t.ok(store.getActions()[1].payload.action, 'ADD_MESSAGE payload contains action');

      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});
