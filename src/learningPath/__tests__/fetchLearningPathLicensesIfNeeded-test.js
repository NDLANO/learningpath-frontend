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

import { applicationError } from '../../messages/messagesActions';
import { fetchLearningPathLicenses, setAllLicenses, setCreativeCommonLicenses } from '../edit/copyright/learningPathLicensesActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const accessToken = '123345';
const licenses = [{ license: 'GPL v3', description: 'En lisens', url: 'ndla.no' }, { license: 'Copyright v3', description: 'En lisens', url: 'ndla.no' }];
test('actions/fetchLearningPathLicenses with creative-common sat to false', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { Authorization: `Bearer ${accessToken}` } })
    .get('/learningpath-api/v1/learningpaths/licenses')
    .reply(200, licenses);

  const store = mockStore({ accessToken });

  store.dispatch(fetchLearningPathLicenses())
    .then(() => {
      t.deepEqual(store.getActions(), [
        setAllLicenses(licenses),
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});


test('actions/fetchLearningPathLicenses with creative-common sat to false access denied', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { Authorization: `Bearer ${accessToken}` } })
    .get('/learningpath-api/v1/learningpaths/licenses')
    .reply(403, { message: 'Invalid' });

  const store = mockStore({ accessToken });

  store.dispatch(fetchLearningPathLicenses())
    .then(() => {
      t.deepEqual(store.getActions(), [
        applicationError(payload403invalid('http://ndla-api/learningpath-api/v1/learningpaths/licenses')),
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});


test('actions/fetchLearningPathLicenses with creative-common sat to false', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { Authorization: `Bearer ${accessToken}` } })
    .get('/learningpath-api/v1/learningpaths/licenses')
    .query({ filter: 'by' })
    .reply(200, licenses);

  const store = mockStore({ accessToken });

  store.dispatch(fetchLearningPathLicenses('by'))
    .then(() => {
      t.deepEqual(store.getActions(), [
        setCreativeCommonLicenses(licenses),
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});


test('actions/fetchLearningPathLicenses with creative-common sat to true access denied', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { Authorization: `Bearer ${accessToken}` } })
    .get('/learningpath-api/v1/learningpaths/licenses')
    .query({ filter: 'by' })
    .reply(403, { message: 'Invalid' });

  const store = mockStore({ accessToken });

  store.dispatch(fetchLearningPathLicenses('by'))
    .then(() => {
      t.deepEqual(store.getActions(), [
        applicationError(payload403invalid('http://ndla-api/learningpath-api/v1/learningpaths/licenses?filter=by')),
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});
