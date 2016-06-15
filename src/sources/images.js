import 'isomorphic-fetch';

import {resolveJsonOrRejectWithError, apiResourceUrl } from './helpers';

const imagesUrl = apiResourceUrl('/images');
const imageUrl = apiResourceUrl('/images/:imageId');

const fetchImages = (authToken) => {
  const url = imagesUrl;
  return fetch(url).then(resolveJsonOrRejectWithError);
};
const fetchImage = (authToken, imageId) => {
  const url = imageUrl(imageId);

  return fetch(url).then(resolveJsonOrRejectWithError);
};
export {
  fetchImages,
  fetchImage,
};
