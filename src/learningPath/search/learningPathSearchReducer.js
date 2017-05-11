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
  results: [],
  totalCount: 1,
};

export default handleActions({
  SET_LEARNING_PATH_SEARCH_RESULTS: {
    next: (state, action) => action.payload,
    throw: state => state,
  },
  SET_LEARNING_PATH_BASED_ON: {
    next: (state, action) => {
      const nextState = cloneDeep(state);
      const results = nextState.results;
      const index = nextState.results.findIndex(path => path.id === action.payload.pathId);
      const updatedResults = [
        ...results.slice(0, index),
        { ...results[index], isBasedOnTitle: action.payload.isBasedOnPath.title },
        ...results.slice(index + 1),
      ];
      nextState.results = updatedResults;
      return nextState;
    },
    throw: state => state,
  },
}, initialState);
