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

import { resolveJsonOrRejectWithError, imageApiResourceUrl } from './helpers';

const imagesUrl = imageApiResourceUrl('/images');

const fetchImages = (query = { 'page-size': 16, page: 1 }) => {
  let url = imagesUrl;
  console.log(url);
  url += `?${queryString.stringify(query)}`;
  return fetch(url).then(resolveJsonOrRejectWithError);
};
const fetchImage = (imageId) => {
  const url = imageApiResourceUrl(formatPattern('/images/:imageId', { imageId }));
  return fetch(url).then(resolveJsonOrRejectWithError);
};
const fetchImageWithMetaUrl = url => fetch(url).then(resolveJsonOrRejectWithError);

export {
  fetchImages,
  fetchImage,
  fetchImageWithMetaUrl,
};
