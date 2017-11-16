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
  allLicenses: {
    all: [],
    hasFetched: false,
  },
  creativeCommonLicenses: {
    all: [],
    hasFetched: false,
  },
};

export default handleActions(
  {
    SET_CREATIVE_COMMON_LICENSES: {
      next(state, action) {
        const nextState = cloneDeep(state);
        nextState.creativeCommonLicenses = Object.assign(
          {},
          {
            all: action.payload,
            hasFetched: true,
          },
        );
        return nextState;
      },
      throw(state) {
        return state;
      },
    },
    SET_ALL_LICENSES: {
      next(state, action) {
        const nextState = cloneDeep(state);
        nextState.allLicenses = Object.assign(
          {},
          {
            all: action.payload,
            hasFetched: true,
          },
        );
        return nextState;
      },
      throw(state) {
        return state;
      },
    },
  },
  initialState,
);
