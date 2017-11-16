/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { handleActions } from 'redux-actions';

const initialState = {
  all: [],
  hasFetched: false,
};

export default handleActions(
  {
    SET_LEARNING_PATH_CONTRIBUTORS: {
      next(state, action) {
        return Object.assign(
          {},
          {
            all: action.payload,
            hasFetched: true,
          },
        );
      },
      throw(state) {
        return state;
      },
    },
  },
  initialState,
);
