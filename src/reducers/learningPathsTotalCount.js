/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { handleActions } from 'redux-actions';

export default handleActions({
  SET_LEARNING_PATHS_TOTAL_COUNT: {
    next(state, action) { return action.payload; },
    throw(state) { return state; },
  },
}, 1);
