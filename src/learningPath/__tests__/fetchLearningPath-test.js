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
import { fetchLearningPath, setLearningPath } from '../learningPathActions';
import { setSavedImage, setSelectedImage } from '../../imageSearch/imageActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const authToken = '123345';
const pathId = 123;

test('actions/fetchLearningPath without image', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get(`/learningpath-api/v1/learningpaths/${pathId}`)
    .reply(200, { id: pathId });

  const store = mockStore({ authToken });

  store.dispatch(fetchLearningPath(pathId))
    .then(() => {
      t.deepEqual(store.getActions(), [
        setLearningPath({ id: pathId }),
        setSavedImage({}),
        setSelectedImage({}),
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});

test('actions/fetchLearningPath with image', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get(`/learningpath-api/v1/learningpaths/${pathId}`)
    .reply(200, { id: pathId, coverPhoto: { url: 'test', metaUrl: 'metaTest' } });

  const store = mockStore({ authToken });

  store.dispatch(fetchLearningPath(pathId))
    .then(() => {
      t.deepEqual(store.getActions(), [
        setLearningPath({ id: pathId, coverPhoto: { url: 'test', metaUrl: 'metaTest' } }),
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});

test('actions/fetchLearningPath access denied', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get(`/learningpath-api/v1/learningpaths/${pathId}`)
    .reply(403, { message: 'Invalid' });

  const store = mockStore({ authToken });

  store.dispatch(fetchLearningPath(pathId))
    .then(() => {
      t.deepEqual(store.getActions(), [
        applicationError(payload403invalid()),
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});
