/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { handleActions } from "redux-actions";

const DEFAULT = "title";

export default handleActions(
  {
    SET_MY_LEARNING_PATHS_SORT_ORDER: {
      next(state, action) {
        return action.payload;
      },
      throw(state) {
        return state;
      },
    },
    LOGOUT: () => DEFAULT,
  },
  DEFAULT,
);
