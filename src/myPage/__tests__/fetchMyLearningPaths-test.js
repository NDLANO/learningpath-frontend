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
import payload403invalid from '../../actions/__tests__/payload403invalid';

import { fetchMyLearningPaths, setLearningPaths } from '../myPageActions';
import { applicationError } from '../../messages/messagesActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const authToken = '123345';

test('actions/fetchMyLearningPaths', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/learningpath-api/v1/learningpaths/mine')
    .reply(200, [{ id: '123' }, { id: '456' }]);

  const store = mockStore({ authToken });

  store.dispatch(fetchMyLearningPaths())
    .then(() => {
      t.deepEqual(store.getActions(), [
        setLearningPaths([{ id: '123' }, { id: '456' }]),
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});

test('actions/fetchLearningPaths access denied', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/learningpath-api/v1/learningpaths/mine')
    .reply(403, { message: 'Invalid' });

  const store = mockStore({ authToken });

  store.dispatch(fetchMyLearningPaths())
    .then(() => {
      t.deepEqual(store.getActions(), [
        applicationError(payload403invalid()),
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});
