import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import actions from '..';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const authToken = '123345';

test('actions/checkValidSession', (t) => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/auth/me')
    .reply(200, {first_name: 'alice', email: 'alice@example.com'});

  const store = mockStore({authToken});

  store.dispatch(actions.checkValidSession())
    .then(() => {
      t.deepEqual(store.getActions(), []);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});

test('actions/checkValidSession invalid authToken', (t) => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/auth/me')
    .reply(403, {message: 'Invalid'});

  const store = mockStore({authToken});

  store.dispatch(actions.checkValidSession())
    .then(() => {
      t.deepEqual(store.getActions(), [
        { type: 'LOGOUT', payload: undefined }
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});
