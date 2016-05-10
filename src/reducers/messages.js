import {handleActions} from 'redux-actions';
import cloneDeep from 'lodash/cloneDeep';
import uuid from 'node-uuid';

export default handleActions({
  ADD_MESSAGE: {
    next(state, action) {
      let message = {
        id: uuid.v4(),
        message: action.payload.message,
        severity: action.payload.severity,
        timeToLive: (typeof action.payload.timeToLive === 'undefined') ? 1500 : action.payload.timeToLive
      };

      let nextState = cloneDeep(state);
      nextState.push(message);
      return nextState;
    },
    throw(state) {return state;}
  },

  CLEAR_ALL_MESSAGES: {
    next(state, action) {
      return [];
    },
    throw(state) {return state;}
  },

  CLEAR_MESSAGE: {
    next(state, action) {
      return state.filter(m => m.id != action.payload);
    },
    throw(state) {return state;}
  },

  APPLICATION_ERROR: {
    throw(state, action) {
      let nextState = cloneDeep(state);
      action.payload.json.messages.forEach(function (m) {
        nextState.push({id: uuid.v4(), message: m.field + ': ' + m.message, severity: 'danger', timeToLive: 0});
      });
      return nextState;
    }
  }
}, []);
