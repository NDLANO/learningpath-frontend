/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import 'isomorphic-fetch';
import queryString from 'query-string';
import { resolveJsonOrRejectWithError } from './helpers';

const fetchGoogleContent = query => {
  const params = {
    q: `${query.textQuery} ${query.filter.key}`,
    start: query.start ? query.start : undefined,
  };
  return fetch(`/customsearch/?${queryString.stringify(params)}`).then(
    resolveJsonOrRejectWithError,
  );
};

export { fetchGoogleContent };
