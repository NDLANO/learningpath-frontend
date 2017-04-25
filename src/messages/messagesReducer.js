/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { handleActions } from 'redux-actions';
import cloneDeep from 'lodash/cloneDeep';
import { uuid } from 'ndla-util';

export default handleActions({
  ADD_MESSAGE: {
    next(state, action) {
      const message = {
        id: uuid(),
        message: action.payload.message,
        severity: action.payload.severity,
        action: action.payload.action,
        timeToLive: (typeof action.payload.timeToLive === 'undefined') ? 1500 : action.payload.timeToLive,
      };

      const nextState = cloneDeep(state);
      nextState.push(message);
      return nextState;
    },
    throw(state) { return state; },
  },

  CLEAR_ALL_MESSAGES: {
    next: () => [],
    throw: state => state,
  },

  CLEAR_MESSAGE: {
    next(state, action) {
      return state.filter(m => m.id !== action.payload);
    },
    throw(state) { return state; },
  },

  APPLICATION_ERROR: {
    throw(state, action) {
      const nextState = cloneDeep(state);

      if (action.payload.json && action.payload.json.messages) {
        action.payload.json.messages.forEach((m) => {
          nextState.push({ id: uuid(), message: `${m.field}: ${m.message}`, severity: 'danger', timeToLive: 0 });
        });
      }

      return nextState;
    },
  },
}, []);
