/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from 'redux-actions';
import pickBy from 'lodash/pickBy';

import { applicationError } from '../messages/messagesActions';
import {
  fetchImages,
  fetchImage,
  fetchImageWithMetaUrl,
} from '../sources/images';

export const setImages = createAction('SET_IMAGES');
export const setSelectedImage = createAction('SET_SELECTED_IMAGE');
export const setSavedImage = createAction('SET_SAVED_IMAGE');
export const setImagesSearchTime = createAction('SET_IMAGES_SEARCH_TIME');
export const changeImageSearchQuery = createAction('CHANGE_IMAGE_SEARCH_QUERY');

export function fetchLearningPathImages(query, isFirstSearch = false) {
  return dispatch =>
    fetchImages(pickBy(query))
      .then(images => {
        /*
        If the default search on the title (first search from edit learningpath), a new search will be executed with a empty query string.
      */
        if (images.totalCount === 0 && isFirstSearch) {
          const newQuery = {
            query: '',
            'page-size': query['page-size'],
            page: query.page,
          };
          dispatch(fetchLearningPathImages(newQuery, false));
        } else {
          dispatch(setImages(images));
          dispatch(changeImageSearchQuery(query));
        }
      })
      .catch(err => dispatch(applicationError(err)));
}

export function fetchLearningPathImage(imageId) {
  return dispatch =>
    fetchImage(imageId)
      .then(image => {
        dispatch(setSelectedImage(image));
      })
      .catch(err => dispatch(applicationError(err)));
}
export function fetchLearningPathImageWithMetaUrl(url) {
  return dispatch =>
    fetchImageWithMetaUrl(url)
      .then(image => {
        dispatch(setSavedImage(image));
      })
      .catch(err => dispatch(applicationError(err)));
}
