/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';
import get from 'lodash/get';
import { tagsI18N } from '../util/i18nFieldFinder';
import { getLocale } from '../locale/localeSelectors';

const getImageSearch = state => state.imageSearch;
const getPageSize = state => state.imageSearch.imageSearchQuery['page-size'];

export const getSelectedImage = createSelector(
  [getImageSearch, getLocale],
  (imageSearch, lang) => ({
    ...imageSearch.selectedImage,
    tags: imageSearch.selectedImage ? tagsI18N(imageSearch.selectedImage, lang) : [],
  })
);

export const getImageSearchQuery = state => get(state, 'imageSearch.imageSearchQuery', { query: '', page: 1, 'page-size': 16 });

export const getResults = createSelector(
  [getImageSearch],
  imageSearch => imageSearch.images.results
);

export const getLastPage = createSelector(
  [getImageSearch, getPageSize],
  (imageSearch, pageSize) => Math.ceil(imageSearch.images.totalCount / (pageSize || 1))
);

export const getTotalCount = state => get(state, 'imageSearch.images.totalCount', 0);
