import {handleActions} from 'redux-actions';
import cloneDeep from 'lodash/cloneDeep';

export default handleActions({
  ADD_MESSAGE: {
    next(state, action) {
      let nextState = cloneDeep(state);
      nextState.push(action.payload);
      return nextState;
    },
    throw(state) {return state;}
  },
  
  CLEAR_MESSAGES: {
    next(state, action) {
      return [];
    },
    throw(state) {return state;}
  },

  APPLICATION_ERROR: {
    throw(state, action) {
      let nextState = cloneDeep(state);
      action.payload.json.messages.forEach(function (m) {
        nextState.push({message: m.field + ': ' + m.message, severity: 'danger'});
      });
      return nextState;
    }
  }
}, []);
