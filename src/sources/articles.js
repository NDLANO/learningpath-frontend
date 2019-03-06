/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import queryString from 'query-string';
import cloneDeep from 'lodash/cloneDeep';
import fetch from './fetch';
import { resolveJsonOrRejectWithError, apiResourceUrl } from './helpers';

const articleBaseUrl = apiResourceUrl('/article-api/v2/articles');

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
  return fetch(url).then(resolveJsonOrRejectWithError);
};

export { fetchArticles };
