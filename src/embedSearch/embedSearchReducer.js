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
  ndla: {
    query: {
      textQuery: '',
      page: 1,
      'page-size': 10,
      numberOfPages: 1,
    },
    oembedContent: {},
    result: {},
  },
  external: {
    query: {
      start: 1,
      textQuery: '',
      filter: { key: 'more:youtube', name: 'Youtube', type: 'oembed' },
      page: 1,
      numberOfPages: 1,
    },
    result: {},
    oembedContent: {},
  },
};
export default handleActions(
  {
    SET_EMBED_RESULTS: {
      next(state, action) {
        const nextState = cloneDeep(state);
        nextState[action.payload.type].result = action.payload.result;
        return nextState;
      },
      throw(state) {
        return state;
      },
    },
    SET_EMBED_PREVIEW: {
      next(state, action) {
        const nextState = cloneDeep(state);
        nextState[action.payload.type].oembedContent =
          action.payload.oembedContent;
        return nextState;
      },
      throw(state) {
        return state;
      },
    },
    CHANGE_EMBED_SEARCH_QUERY: {
      next(state, action) {
        const nextState = cloneDeep(state);
        nextState[action.payload.type].query = action.payload.query;
        return nextState;
      },
    },
    REMOVE_EMBED_PREVIEW: {
      next(state, action) {
        const nextState = cloneDeep(state);
        nextState[action.payload.type].oembedContent = {};
        return nextState;
      },
      throw(state) {
        return state;
      },
    },
  },
  initialState,
);
