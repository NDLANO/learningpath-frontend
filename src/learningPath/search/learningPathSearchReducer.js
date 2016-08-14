/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { handleActions } from 'redux-actions';

const initialState = {
  results: [],
  totalCount: 1,
};

export default handleActions({
  SET_LEARNING_PATH_SEARCH_RESULTS: {
    next: (state, action) => action.payload,
    throw: (state) => state,
  },
}, initialState);
