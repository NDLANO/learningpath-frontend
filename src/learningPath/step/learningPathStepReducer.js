/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { handleActions } from "redux-actions";
import cloneDeep from "lodash/cloneDeep";

const intitalState = {};
export default handleActions(
  {
    LAST_DELETED_LEARNING_PATH_STEP: {
      next(state, action) {
        return action.payload;
      },
      throw(state) {
        return state;
      },
    },
    SET_LEARNING_PATH_STEP: {
      next(state, action) {
        return action.payload;
      },
      throw(state) {
        return state;
      },
    },
    SET_OEMBED_OBJECT: {
      next(state, action) {
        const nextState = cloneDeep(state);
        nextState.oembed = action.payload;
        return nextState;
      },
      throw(state) {
        return state;
      },
    },
    CREATE_EMPTY_LEARNING_PATH_STEP: {
      next() {
        return {
          title: {},
          description: {},
          embedUrl: {},
          type: "TEXT",
          license: "",
        };
      },
      throw(state) {
        return state;
      },
    },
    LOGOUT: () => intitalState,
  },
  intitalState,
);
