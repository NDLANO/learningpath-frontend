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
import payload403invalid from '../../actions/__tests__/payload403invalid';
import { testError } from '../../common/__tests__/testError';

import { applicationError } from '../../messages/messagesActions';
import {
  fetchLearningPathImage,
  setSavedImage,
  setSelectedImage,
  fetchLearningPathImageWithMetaUrl,
} from '../../imageSearch/imageActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const imageId = 123;

const imageMetaUrl = 'http://ndla-api:80/image-api/v2/images/123';

test('actions/fetchImage with id', done => {
  const apiMock = nock('http://ndla-api')
    .get(`/image-api/v2/images/${imageId}`)
    .reply(200, { id: imageId });

  const store = mockStore({});

  store
    .dispatch(fetchLearningPathImage(imageId))
    .then(() => {
      expect(store.getActions()).toEqual([setSelectedImage({ id: imageId })]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(testError);
});

test('actions/fetchImage with url', done => {
  const apiMock = nock('http://ndla-api')
    .get(`/image-api/v2/images/${imageId}`)
    .reply(200, { id: imageId });

  const store = mockStore({});

  store
    .dispatch(fetchLearningPathImageWithMetaUrl(imageMetaUrl))
    .then(() => {
      expect(store.getActions()).toEqual([setSavedImage({ id: 123 })]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(testError);
});

test('actions/fetchImage with id access denied', done => {
  const apiMock = nock('http://ndla-api')
    .get(`/image-api/v2/images/${imageId}`)
    .reply(403, { message: 'Invalid' });

  const store = mockStore();

  store
    .dispatch(fetchLearningPathImage(imageId))
    .then(() => {
      expect(store.getActions()).toEqual([
        applicationError(
          payload403invalid(`http://ndla-api/image-api/v2/images/${imageId}`),
        ),
      ]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(testError);
});

test('actions/fetchImage with url access denied', done => {
  const apiMock = nock('http://ndla-api')
    .get(`/image-api/v2/images/${imageId}`)
    .reply(403, { message: 'Invalid' });

  const store = mockStore();

  store
    .dispatch(fetchLearningPathImageWithMetaUrl(imageMetaUrl))
    .then(() => {
      expect(store.getActions()).toEqual([
        applicationError(
          payload403invalid(
            `http://ndla-api:80/image-api/v2/images/${imageId}`,
          ),
        ),
      ]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(testError);
});
