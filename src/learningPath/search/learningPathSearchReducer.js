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
};

export default handleActions({
  SET_LEARNING_PATH_SEARCH_RESULTS: {
    next(state, action) {
      const nextState = cloneDeep(state);
      nextState.results = action.payload;
      return nextState;
    },
    throw: (state) => state,
  },
}, initialState);
