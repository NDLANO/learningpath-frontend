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
import { deleteLearningPath } from '../learningPathActions';
import { testError } from '../../common/__tests__/testError';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const accessToken = '12345678';

test('actions/deleteLearningPath', done => {
  const apiMock = nock('http://ndla-api', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .delete('/learningpath-api/v2/learningpaths/123')
    .reply(204);

  const store = mockStore({ accessToken });

  store
    .dispatch(deleteLearningPath({ id: 123, status: 'PRIVATE' }))
    .then(() => {
      expect(store.getActions()[0]).toEqual({
        type: 'REMOVE_LEARNING_PATH',
        payload: 123,
      });
      expect(store.getActions()[1].type).toBe('ADD_MESSAGE');
      expect(store.getActions()[1].payload.action).toBeTruthy();
      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(testError);
});
