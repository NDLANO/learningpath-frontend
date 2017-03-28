/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import 'isomorphic-fetch';
import queryString from 'query-string';
import { formatPattern } from 'react-router/lib/PatternUtils';

import { resolveJsonOrRejectWithError, apiResourceUrl, authorizationHeader } from './helpers';

const imagesUrl = apiResourceUrl('/image-api/v1/images');

const fetchImages = (query = { 'page-size': 16, page: 1 }, token) => {
  let url = imagesUrl;
  url += `?${queryString.stringify(query)}`;
  return fetch(url, { headers: { Authorization: authorizationHeader(token) } }).then(resolveJsonOrRejectWithError);
};
const fetchImage = (imageId, token) => {
  const url = apiResourceUrl(formatPattern('/image-api/v1/images/:imageId', { imageId }));
  return fetch(url, { headers: { Authorization: authorizationHeader(token) } }).then(resolveJsonOrRejectWithError);
};
const fetchImageWithMetaUrl = (url, token) => fetch(url, { headers: { Authorization: authorizationHeader(token) } }).then(resolveJsonOrRejectWithError);

export {
  fetchImages,
  fetchImage,
  fetchImageWithMetaUrl,
};
