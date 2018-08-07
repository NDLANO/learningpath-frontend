/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import 'isomorphic-fetch';
import queryString from 'query-string';
import cloneDeep from 'lodash/cloneDeep';
import { fetchAuth } from './fetchAuth';
import {
  resolveJsonOrRejectWithError,
  apiResourceUrl,
  fetchAuthorized,
} from './helpers';

const articleBaseUrl = apiResourceUrl('/article-api/v2/articles');

const fetchArticle = fetchAuthorized('/article-api/v2/articles/:articleId');

const fetchArticles = (query, locale) => {
  let url = articleBaseUrl;
  if (query) {
    const q = cloneDeep(query);
    if (q.pageSize !== undefined) {
      q['page-size'] = q.pageSize;
      delete q.pageSize;
    }
    if (q.query === '') {
      delete q.query;
    }
    q.language = locale || 'nb';

    url += `?${queryString.stringify(q)}`;
  }
  return fetchAuth(url).then(resolveJsonOrRejectWithError);
};

export { fetchArticle, fetchArticles };
