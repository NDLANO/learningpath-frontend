import 'isomorphic-fetch';
import queryString from 'query-string';
import { formatPattern } from 'react-router/lib/PatternUtils';

import {resolveJsonOrRejectWithError, apiResourceUrl } from './helpers';

const imagesUrl = apiResourceUrl('/images');

const fetchImages = (query = {'page-size': 16, page: 1}) => {
  let url = imagesUrl;
  url += `?${queryString.stringify(query)}`;
  return fetch(url).then(resolveJsonOrRejectWithError);
};
const fetchImage = (imageId) => {
  const url = apiResourceUrl(formatPattern('/images/:imageId', {imageId}));
  return fetch(url).then(resolveJsonOrRejectWithError);
};
export {
  fetchImages,
  fetchImage,
};
