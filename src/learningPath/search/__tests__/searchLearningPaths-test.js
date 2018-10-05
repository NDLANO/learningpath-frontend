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
import { testError } from '../../../common/__tests__/testError';
import {
  searchLearningPaths,
  setLearningPathSearchResults,
} from '../learningPathSearchActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const accessToken = '12345678';

test('actions/searchLearningPaths', done => {
  const apiMock = nock('http://ndla-api', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .get('/learningpath-api/v2/learningpaths')
    .reply(200, {
      totalCount: 2,
      page: 3,
      pageSize: 25,
      results: [{ id: '123' }, { id: '456' }],
    });

  const store = mockStore({ accessToken });

  store
    .dispatch(searchLearningPaths())
    .then(() => {
      expect(store.getActions()).toEqual([
        setLearningPathSearchResults({
          results: [{ id: '123' }, { id: '456' }],
          totalCount: 2,
        }),
      ]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(testError);
});

test('actions/searchLearningPaths with query', done => {
  const apiMock = nock('http://ndla-api', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .get('/learningpath-api/v2/learningpaths')
    .query({
      query: 'foobar',
      page: 4,
      'page-size': 15,
      sort: '-relevance',
      language: 'nb',
      fallback: true,
    })
    .reply(200, {
      totalCount: 400,
      page: 4,
      pageSize: 15,
      results: [{ id: '123' }, { id: '456' }],
    });

  const initialState = {
    learningPathQuery: {
      query: 'foobar',
      sort: '-relevance',
      page: 4,
      pageSize: 15, // OBS! not page-size
    },
    accessToken,
  };

  const store = mockStore(initialState);

  store
    .dispatch(searchLearningPaths(initialState.learningPathQuery))
    .then(() => {
      expect(store.getActions()).toEqual([
        setLearningPathSearchResults({
          results: [{ id: '123' }, { id: '456' }],
          totalCount: 400,
        }),
      ]);
      expect(() => apiMock.done()).not.toThrow();
      expect(initialState.learningPathQuery.pageSize).toBe(15);
      expect(initialState.learningPathQuery['page-size']).toBeFalsy();
      done();
    })
    .catch(testError);
});

test('actions/searchLearningPaths with query without search term', done => {
  const page = 3;
  const pageSize = 10;
  const sort = '-relevance';

  const apiMock = nock('http://ndla-api', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .get('/learningpath-api/v2/learningpaths')
    .query({
      language: 'nb',
      fallback: true,
      page,
      sort,
      'page-size': pageSize /* OBS! no query */,
    })
    .reply(200, {
      page,
      pageSize,
      totalCount: 400,
      results: [{ id: '123' }, { id: '456' }],
    });

  const initialState = {
    learningPathQuery: { sort, page, pageSize, query: '' },
    accessToken,
  };

  const store = mockStore(initialState);

  store
    .dispatch(searchLearningPaths(initialState.learningPathQuery))
    .then(() => {
      expect(store.getActions()).toEqual([
        setLearningPathSearchResults({
          results: [{ id: '123' }, { id: '456' }],
          totalCount: 400,
        }),
      ]);
      expect(() => apiMock.done()).not.toThrow();
      expect(initialState.learningPathQuery.query).toBe('');
      done();
    })
    .catch(testError);
});
