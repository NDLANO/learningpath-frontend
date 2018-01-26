/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';
import get from 'lodash/get';
import { convertFieldWithFallback } from '../util/convertFieldWithFallback';

const getImageSearch = state => state.imageSearch;
const getPageSize = state => state.imageSearch.imageSearchQuery['page-size'];

export const getSelectedImage = createSelector(
  [getImageSearch],
  imageSearch => ({
    ...imageSearch.selectedImage,
    title: convertFieldWithFallback(imageSearch.selectedImage, 'title', ''),
    tags: convertFieldWithFallback(imageSearch.selectedImage, 'tags', []),
    alttext: convertFieldWithFallback(imageSearch.selectedImage, 'alttext', ''),
    caption: convertFieldWithFallback(imageSearch.selectedImage, 'caption', ''),
  }),
);

export const getSavedImage = createSelector([getImageSearch], imageSearch => ({
  ...imageSearch.savedImage,
  title: convertFieldWithFallback(imageSearch.savedImage, 'title', ''),
  tags: convertFieldWithFallback(imageSearch.savedImage, 'tags', []),
  alttext: convertFieldWithFallback(imageSearch.savedImage, 'alttext', ''),
  caption: convertFieldWithFallback(imageSearch.savedImage, 'caption', ''),
}));

export const getImageSearchQuery = state =>
  get(state, 'imageSearch.imageSearchQuery', {
    query: '',
    page: 1,
    'page-size': 16,
  });

export const getResults = createSelector(
  [getImageSearch],
  imageSearch => imageSearch.images.results,
);

export const getLastPage = createSelector(
  [getImageSearch, getPageSize],
  (imageSearch, pageSize) =>
    Math.ceil(imageSearch.images.totalCount / (pageSize || 1)),
);

export const getTotalCount = state =>
  get(state, 'imageSearch.images.totalCount', 0);
