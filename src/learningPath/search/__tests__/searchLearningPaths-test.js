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

import {
  searchLearningPaths,
  setLearningPathSearchResults,
} from '../learningPathSearchActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

test('actions/searchLearningPaths', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api')
    .get('/learningpaths')
    .reply(200, {
      totalCount: 2,
      page: 3,
      pageSize: 25,
      results: [{ id: '123' }, { id: '456' }],
    });

  const store = mockStore({});

  store.dispatch(searchLearningPaths())
    .then(() => {
      t.deepEqual(store.getActions(), [
        setLearningPathSearchResults({
          results: [{ id: '123' }, { id: '456' }],
          totalCount: 2,
        }),
      ]);

      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});

test('actions/searchLearningPaths with query', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };


  const apiMock = nock('http://ndla-api')
    .get('/learningpaths')
    .query({ query: 'foobar', page: 4, 'page-size': 15, sort: '-relevance' })
    .reply(200, {
      totalCount: 400,
      page: 4,
      pageSize: 15,
      results: [{ id: '123' }, { id: '456' }],
    })
    .log(console.log);

  const initialState = {
    learningPathQuery: {
      query: 'foobar',
      sort: '-relevance',
      page: 4,
      pageSize: 15, // OBS! not page-size
    },
  };

  const store = mockStore(initialState);

  store.dispatch(searchLearningPaths())
    .then(() => {
      t.deepEqual(store.getActions(), [
        setLearningPathSearchResults({
          results: [{ id: '123' }, { id: '456' }],
          totalCount: 400,
        }),
      ]);

      t.doesNotThrow(() => apiMock.done());
      t.equal(initialState.learningPathQuery.pageSize, 15, 'side effect 1');
      t.notOk(initialState.learningPathQuery['page-size'], 'side effect 2');

      done();
    })
    .catch(done);
});

test('actions/searchLearningPaths with query without search term', (t) => {
  const done = (res) => {
    t.end(res);
    nock.cleanAll();
  };

  const page = 3;
  const pageSize = 10;
  const sort = '-relevance';

  const apiMock = nock('http://ndla-api')
    .get('/learningpaths')
    .query({ page, sort, 'page-size': pageSize /* OBS! no query */})
    .reply(200, {
      page,
      pageSize,
      totalCount: 400,
      results: [{ id: '123' }, { id: '456' }],
    });

  const initialState = {
    learningPathQuery: { sort, page, pageSize, query: '' },
  };

  const store = mockStore(initialState);

  store.dispatch(searchLearningPaths())
    .then(() => {
      t.deepEqual(store.getActions(), [
        setLearningPathSearchResults({
          results: [{ id: '123' }, { id: '456' }],
          totalCount: 400,
        }),
      ]);

      t.doesNotThrow(() => apiMock.done());
      t.equal(initialState.learningPathQuery.query, '', 'side effect');
      done();
    })
    .catch(done);
});
