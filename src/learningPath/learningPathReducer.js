/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { handleActions } from 'redux-actions';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import assign from 'lodash/assign';
import findIndex from 'lodash/findIndex';
import assureSequenceOrder from '../util/assureSequenceOrder';

export const initialState = {
};

export default handleActions({
  SET_LEARNING_PATH: {
    next(state, action) {
      return Object.assign({},
        action.payload,
        { learningsteps: assureSequenceOrder(action.payload.learningsteps) }
      );
    },
    throw(state) { return state; },
  },

  UPDATE_LEARNING_PATH_STEP: {
    next(state, action) {
      const nextState = cloneDeep(state);
      const steps = get(nextState, 'learningsteps', []);
      const index = findIndex(steps, ['seqNo', action.payload.seqNo]);

      if (index === -1) {
        steps.push(action.payload);
      } else {
        assign(steps[index], action.payload);
      }

      nextState.learningsteps = steps;

      return nextState;
    },

    throw(state) { return state; },
  },

  SORT_LEARNING_PATH_STEPS: {
    next(state, action) {
      if (state.learningsteps.length !== action.payload.length) {
        return state;
      }
      const nextState = cloneDeep(state);
      nextState.learningsteps = action.payload;
      return nextState;
    },
    throw(state) { return state; },
  },

  UPDATE_LEARNING_PATH_TAGS: {
    next(state, action) { return Object.assign({}, state, { tags: action.payload }); },
    throw(state) { return state; },
  },
  UPDATE_LEARNING_PATH_STATUS: {
    next(state, action) {
      const { status } = action.payload;
      const nextState = cloneDeep(state);
      nextState.status = status;
      return nextState;
    },
    throw: state => state,
  },

  LOGOUT: () => ({}),
}, initialState);
