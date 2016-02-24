import test from 'tape';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import actions from '..';

const middleware = [ thunk ];
const mockStore = configureMockStore(middleware);

test('actions/initializeSession', (t) => {
  const authToken = '123345';

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/auth/me')
    .reply(200, {first_name: 'Alice', email: 'alice@example.com'});

  const expectedActions = [
    actions.setAuthenticated(true),
    actions.setAuthToken(authToken),
    actions.setUserData({first_name: 'Alice', email: 'alice@example.com'})
  ];

  const store = mockStore({user: {}, authToken: ''}, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.end(res);

    nock.cleanAll();
  });

  store.dispatch( actions.initializeSession(authToken) );
});

test('actions/initializeSession access denied', (t) => {
  const authToken = '123345';

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/auth/me')
    .reply(403, {message: 'Invalid'});

  const expectedActions = [
    actions.applicationError(new Error('Invalid'))
  ];

  const store = mockStore({user: {}, authToken: ''}, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.end(res);

    nock.cleanAll();
  });

  store.dispatch( actions.initializeSession(authToken) );
});