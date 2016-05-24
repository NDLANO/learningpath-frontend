import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import payload403invalid from './payload403invalid';

import actions from '..';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const authToken = '123345';

test('actions/logout', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/auth/logout')
    .reply(204);

  const store = mockStore({ authToken });

  store.dispatch(actions.logout())
    .then(() => {
      t.deepEqual(store.getActions(), [
        { type: 'LOGOUT', payload: undefined }
      ]);

      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});

test('actions/logout access denied', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/auth/logout')
    .reply(403, {message: 'Invalid'});

  const store = mockStore({ authToken });
  store.dispatch(actions.logout())
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.applicationError(payload403invalid())
      ]);

      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});
