/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { handleActions } from 'redux-actions';
import cloneDeep from 'lodash/cloneDeep';
import assignOrPushPropReducer from '../util/assignOrPushPropReducer';

const initialState = {
  result: {},
  query: {
    start: 1,
    textQuery: '',
    filter: 'more:ndla',
    page: 1,
    numberOfPages: 1,
  },
  oembedContent: [],
};
export default handleActions({
  SET_EMBED_RESULTS: {
    next(state, action) {
      const nextState = cloneDeep(state);
      nextState.result = action.payload;
      return nextState;
    },
    throw(state) { return state; },
  },
  SET_EMBED_PREVIEW: {
    next: assignOrPushPropReducer('oembedContent'),
    throw(state) { return state; },
  },
  CHANGE_EMBED_SEARCH_QUERY: {
    next(state, action) {
      const nextState = cloneDeep(state);
      nextState.query = action.payload;
      return nextState;
    },
  },
  REMOVE_EMBED_PREVIEW: {
    next(state) {
      const nextState = cloneDeep(state);
      nextState.oembedContent = undefined;
      return nextState;
    },
    throw(state) { return state; },
  },
}, initialState);
