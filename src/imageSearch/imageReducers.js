/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { handleActions } from 'redux-actions';
import cloneDeep from 'lodash/cloneDeep';

const initialState = {
  images: [],
  selectedImage: {},
  savedImage: {},
  imageSearchQuery: {
    query: '',
    page: 1,
    'page-size': 16,
  },
};
export default handleActions({
  SET_IMAGES: {
    next(state, action) {
      const nextState = cloneDeep(state);
      nextState.images = action.payload;
      return nextState;
    },
    throw(state) { return state; },
  },
  SET_SELECTED_IMAGE: {
    next(state, action) {
      const nextState = cloneDeep(state);
      nextState.selectedImage = action.payload;
      return nextState;
    },
    throw(state) { return state; },
  },
  SET_SAVED_IMAGE: {
    next(state, action) {
      const nextState = cloneDeep(state);
      nextState.savedImage = action.payload;
      return nextState;
    },
    throw(state) { return state; },
  },
  CHANGE_IMAGE_SEARCH_QUERY: {
    next(state, action) {
      const nextState = cloneDeep(state);
      nextState.imageSearchQuery = Object.assign({}, state.imageSearchQuery, action.payload);// action.payload;
      return nextState;
    },
    throw(state) { return state; },
  },
}, initialState);
