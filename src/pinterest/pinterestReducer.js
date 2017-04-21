/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { handleActions } from 'redux-actions';
import cloneDeep from 'lodash/cloneDeep';

const initalState = { pins: [], fetchingPins: false };


export default handleActions({
  SET_PINS: {
    next(state, action) {
      const nextState = cloneDeep(state);
      nextState.pins = action.payload;
      return nextState;
    },
    throw: state => state,
  },
  SET_FETCHING_PINS: {
    next(state, action) {
      const nextState = cloneDeep(state);
      nextState.fetchingPins = action.payload;
      return nextState;
    },
    throw: state => state,
  },
  REMOVE_PINS: () => initalState,
}, initalState);
