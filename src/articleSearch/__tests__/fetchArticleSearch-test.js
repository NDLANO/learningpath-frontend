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
// import { routerActions } from 'react-router-redux';
// import payload403invalid from '../../../actions/__tests__/payload403invalid';

// import { applicationError } from '../../../messages/messagesActions';
import { fetchArticleSearch } from '../articleActions';
import { setEmbedResults } from '../../embedSearch/embedSearchReducer';

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
        disabled: false,
      },
      {
        id: 2,
        title: { title: 'Test3', language: 'nb' },
        introduction: { introduction: 'Test3', language: 'nb' },
        disabled: false,
      },
      {
        id: 3,
        title: { title: 'Test2', language: 'nb' },
        introduction: { introduction: 'Test2', language: 'nb' },
        disabled: false,
      },
    ],
    totalCount: 3,
    pageSize: 10,
  },
};

test('actions/fetchArticleSearch', () => {
  const done = res => {
    done(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .get('/article-api/v2/articles')
    .query({ query: 'hei', 'page-size': 10, page: 1, language: 'nb' })
    .reply(200, { ...apiResponse.result });

  const store = mockStore({ accessToken });

  store
    .dispatch(fetchArticleSearch(query, 'nb'))
    .then(() => {
      expect(store.getActions()).toEqual([
        setEmbedResults({
          type: 'ndla',
          result: apiResponse.result,
        }),
      ]);
      expect(() => apiMock.done()).not.toThrow();
      done();
    })
    .catch(done);
});
