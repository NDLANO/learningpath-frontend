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

import { initializeSession, setAuthenticated, setUserData, setAccessToken } from '../sessionActions';
import { applicationError } from '../../messages/messagesActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const accessToken = '123345';

test('actions/initializeSession', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': accessToken } })
    .get('/auth/me')
    .reply(200, { first_name: 'Alice', email: 'alice@example.com' });

  const store = mockStore({ user: {}, accessToken: '' });

  store.dispatch(initializeSession(accessToken))
    .then(() => {
      t.deepEqual(store.getActions(), [
        setAuthenticated(true),
        setAccessToken(accessToken),
        setUserData({ first_name: 'Alice', email: 'alice@example.com' }),
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});

test('actions/initializeSession access denied', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': accessToken } })
    .get('/auth/me')
    .reply(403, { message: 'Invalid' });

  const store = mockStore({ user: {}, accessToken: '' });

  store.dispatch(initializeSession(accessToken))
    .then(() => {
      t.deepEqual(store.getActions(), [
        applicationError(payload403invalid('http://ndla-api/auth/me')),
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});
