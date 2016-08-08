import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import payload403invalid from './payload403invalid';

import { initializeSession, setAuthenticated, setUserData, setAuthToken } from '..';
import { applicationError } from '../../messages/messagesActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const authToken = '123345';

test('actions/initializeSession', (t) => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/auth/me')
    .reply(200, { first_name: 'Alice', email: 'alice@example.com' });

  const store = mockStore({ user: {}, authToken: '' });

  store.dispatch(initializeSession(authToken))
    .then(() => {
      t.deepEqual(store.getActions(), [
        setAuthenticated(true),
        setAuthToken(authToken),
        setUserData({ first_name: 'Alice', email: 'alice@example.com' }),
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});

test('actions/initializeSession access denied', (t) => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/auth/me')
    .reply(403, { message: 'Invalid' });

  const store = mockStore({ user: {}, authToken: '' });

  store.dispatch(initializeSession(authToken))
    .then(() => {
      t.deepEqual(store.getActions(), [
        applicationError(payload403invalid()),
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});
