import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import { deleteLearningPath } from '../learningPathActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const authToken = '123345';

test('actions/deleteLearningPath', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .delete('/learningpaths/123')
    .reply(204);

  const store = mockStore({ authToken });

  store.dispatch(deleteLearningPath(123))
    .then(() => {
      t.deepEqual(store.getActions(), [
        { type: 'REMOVE_LEARNING_PATH', payload: 123 },
      ]);

      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});
