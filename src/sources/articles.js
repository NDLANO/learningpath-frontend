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
import { fetchAuth } from './fetchAuth';
import { resolveJsonOrRejectWithError, apiResourceUrl } from './helpers';

const articleBaseUrl = isNdla => {
  const baseUrl = apiResourceUrl('/search-api/v1/search');
  return isNdla ? `${baseUrl}/editorial/` : baseUrl;
};

const fetchArticles = (query, locale, isNdla) => {
  let url = articleBaseUrl(isNdla);
  const fetchFunc = isNdla ? fetchAuth : fetch;
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
    q['context-types'] = 'topic-article,standard';

    url += `?${queryString.stringify(q)}`;
  }
  return fetchFunc(url).then(resolveJsonOrRejectWithError);
};

export { fetchArticles };
