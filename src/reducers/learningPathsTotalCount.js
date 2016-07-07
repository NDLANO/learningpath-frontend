import { handleActions } from 'redux-actions';

export default handleActions({
  SET_LEARNING_PATHS_TOTAL_COUNT: {
    next(state, action) { return action.payload; },
    throw(state) { return state; },
  },
}, 1);
