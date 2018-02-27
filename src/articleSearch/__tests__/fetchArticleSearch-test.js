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
import { testError } from '../../common/__tests__/testError';
import { fetchArticleSearch } from '../articleActions';
import {
  setEmbedResults,
  changeEmbedSearchQuery,
} from '../../embedSearch/embedSearchActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const accessToken = '123345678';
const query = {
  textQuery: 'hei',
  page: 1,
};

const apiResponse = {
  result: {
    results: [
      {
        id: 1,
        title: { title: 'Test', language: 'nb' },
        introduction: { introduction: 'Test', language: 'nb' },
      },
      {
        id: 2,
        title: { title: 'Test3', language: 'nb' },
        introduction: { introduction: 'Test3', language: 'nb' },
      },
      {
        id: 3,
        title: { title: 'Test2', language: 'nb' },
        introduction: { introduction: 'Test2', language: 'nb' },
      },
    ],
    totalCount: 3,
    pageSize: 10,
  },
};

const expectedValue = {
  results: [
    {
      id: 1,
      title: { title: 'Test', language: 'nb' },
      introduction: { introduction: 'Test', language: 'nb' },
      link:
        'https://ndla-frontend.test.api.ndla.no/subjects/resource:1/subject:2/something:3',
    },
    {
      id: 2,
      title: { title: 'Test3', language: 'nb' },
      introduction: { introduction: 'Test3', language: 'nb' },
      link:
        'https://ndla-frontend.test.api.ndla.no/subjects/resource:1/subject:2/something:3',
    },
    {
      id: 3,
      title: { title: 'Test2', language: 'nb' },
      introduction: { introduction: 'Test2', language: 'nb' },
      link:
        'https://ndla-frontend.test.api.ndla.no/subjects/resource:1/subject:2/something:3',
    },
  ],
  totalCount: 3,
  pageSize: 10,
};

test('actions/fetchArticleSearch', done => {
  const apiMock = nock('http://ndla-api', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .get('/article-api/v2/articles')
    .query({ query: 'hei', 'page-size': 10, page: 1, language: 'nb' })
    .reply(200, { ...apiResponse.result });

  const taxonomyMocks = apiResponse.result.results.map(item =>
    nock('http://ndla-api', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .get('/taxonomy/v1/queries/resources')
      .query({ contentURI: `urn:article:${item.id}`, language: 'nb' })
      .reply(200, [{ path: '/resource:1/subject:2/something:3' }]),
  );

  const store = mockStore({
    accessToken,
    embedSearch: { ndla: { result: {} } },
  });

  store
    .dispatch(fetchArticleSearch(query, 'nb'))
    .then(() => {
      expect(store.getActions()).toEqual([
        setEmbedResults({
          type: 'ndla',
          result: expectedValue,
        }),
        changeEmbedSearchQuery({
          query: {
            textQuery: 'hei',
            page: 1,
            numberOfPages: 1,
          },
          type: 'ndla',
        }),
      ]);
      expect(() => apiMock.done()).not.toThrow();
      taxonomyMocks.map(mock => expect(() => mock.done()).not.toThrow());
      done();
    })
    .catch(testError);
});
