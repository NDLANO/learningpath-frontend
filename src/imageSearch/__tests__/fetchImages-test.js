/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import { fetchLearningPathImages, setImages, changeImageSearchQuery } from '../imageActions';
import payload403invalid from '../../actions/__tests__/payload403invalid';

import { applicationError } from '../../messages/messagesActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

test('actions/fetchImages', () => {
  const done = (res) => {
    done(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api')
    .get('/image-api/v2/images')
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
      expect(store.getActions()).toEqual([
        setImages({
          totalCount: 2,
          page: 3,
          pageSize: 25,
          results: [{ id: '123' }, { id: '456' }],
        }
        ),
        changeImageSearchQuery({ page: 3, pageSize: 25 }),
      ]);

      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(done);
});

test('actions/fetchImages with url access denied', () => {
  const done = (res) => {
    done(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api')
    .get('/image-api/v2/images')
    .query({ page: 3, pageSize: 25 })
    .reply(403, { message: 'Invalid' });

  const store = mockStore();

  store.dispatch(fetchLearningPathImages({ page: 3, pageSize: 25 }))
    .then(() => {
      expect(store.getActions()).toEqual([
        applicationError(payload403invalid('http://ndla-api/image-api/v2/images?page=3&pageSize=25')),
      ]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(done);
});
