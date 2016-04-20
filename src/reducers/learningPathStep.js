import { handleActions } from 'redux-actions';
import cloneDeep from 'lodash/cloneDeep';

export default handleActions({
  SET_LEARNING_PATH_STEP: {
    next(state, action) { return action.payload; },
    throw(state) { return state; }
  },
  SET_OEMBED_OBJECT: {
    next (state, action) {
      let nextState = cloneDeep(state);
      nextState.oembed = action.payload;
      return nextState;
    },
    throw(state) { return state; }
  },
  LOGOUT: () => ({})
}, {});
