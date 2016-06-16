import 'isomorphic-fetch';

import {resolveJsonOrRejectWithError, apiResourceUrl } from './helpers';

const imagesUrl = apiResourceUrl('/images');
const imageUrl = apiResourceUrl('/images/:imageId');

const fetchImages = () => {
  const url = imagesUrl;
  return fetch(url).then(resolveJsonOrRejectWithError);
};
const fetchImage = (imageId) => {
  const url = imageUrl(imageId);

  return fetch(url).then(resolveJsonOrRejectWithError);
};
export {
  fetchImages,
  fetchImage,
};
