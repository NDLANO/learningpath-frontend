/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { handleActions } from 'redux-actions';
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
import reject from 'lodash/reject';
import set from 'lodash/set';

export default handleActions({
  SET_LEARNING_PATHS: {
    next: (state, action) => action.payload,
    throw: state => state,
  },

  REMOVE_LEARNING_PATH: {
    next: (state, action) => reject(cloneDeep(state), { id: action.payload }),
    throw: state => state,
  },

  UPDATE_LEARNING_PATH_STATUS: {
    next(state, action) {
      const { id, status } = action.payload;
      const nextState = cloneDeep(state);
      set(find(nextState, { id }), 'status', status);
      return nextState;
    },
    throw: state => state,
  },
}, []);
