import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import payload403invalid from './payload403invalid';

import actions from '..';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const authToken = '123345';

test('actions/fetchMyLearningPaths', (t) => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/learningpaths/mine')
    .reply(200, [{id: '123'}, {id: '456'}]);

  const store = mockStore({ authToken });

  store.dispatch(actions.fetchMyLearningPaths())
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.setLearningPaths([{id: '123'}, {id: '456'}])
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});

test('actions/fetchLearningPaths access denied', (t) => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/learningpaths/mine')
    .reply(403, {message: 'Invalid'});

  const store = mockStore({ authToken });

  store.dispatch(actions.fetchMyLearningPaths())
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.applicationError(payload403invalid())
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});
