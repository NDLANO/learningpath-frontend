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

import { fetchLearningPathImages, setImages, changeImageSearchQuery } from '../imageActions';
import payload403invalid from '../../actions/__tests__/payload403invalid';

import { applicationError } from '../../messages/messagesActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

test('actions/fetchImages', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api')
    .get('/images')
    .query({ page: 3, pageSize: 25 })
    .reply(200, {
      totalCount: 2,
      page: 3,
      pageSize: 25,
      results: [{ id: '123' }, { id: '456' }],
    });
  const store = mockStore({});

  store.dispatch(fetchLearningPathImages({ page: 3, pageSize: 25 }))
    .then(() => {
      t.deepEqual(store.getActions(), [
        setImages({
          totalCount: 2,
          page: 3,
          pageSize: 25,
          results: [{ id: '123' }, { id: '456' }] }
        ),
        changeImageSearchQuery({ page: 3, pageSize: 25 }),
      ]);

      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});

test('actions/fetchImage with url access denied', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api')
    .get('/images')
    .query({ page: 3, pageSize: 25 })
    .reply(403, { message: 'Invalid' });

  const store = mockStore();

  store.dispatch(fetchLearningPathImages({ page: 3, pageSize: 25 }))
    .then(() => {
      t.deepEqual(store.getActions(), [
        applicationError(payload403invalid()),
      ]);
      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});
