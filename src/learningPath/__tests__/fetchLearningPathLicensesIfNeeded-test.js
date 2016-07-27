import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import payload403invalid from '../../actions/__tests__/payload403invalid';

import { applicationError } from '../../messages/messagesActions';
import { fetchLearningPathLicenses, setLearningPathLicensens } from '../edit/copyright/learningPathLicensesActions';
const middleware = [thunk];
const mockStore = configureStore(middleware);

const authToken = '123345';
const licenses = [{ license: 'GPL v3', description: 'En lisens', url: 'ndla.no' }, { license: 'Copyright v3', description: 'En lisens', url: 'ndla.no' }];
test('actions/fetchLearningPathLicenses', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/learningpaths/licenses')
    .reply(200, licenses);

  const store = mockStore({ authToken });

  store.dispatch(fetchLearningPathLicenses())
    .then(() => {
      t.deepEqual(store.getActions(), [
        setLearningPathLicensens(licenses),
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});


test('actions/fetchLearningPathLicenses access denied', (t) => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/learningpaths/licenses')
    .reply(403, { message: 'Invalid' });

  const store = mockStore({ authToken });

  store.dispatch(fetchLearningPathLicenses(licenses))
    .then(() => {
      t.deepEqual(store.getActions(), [
        applicationError(payload403invalid()),
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});
