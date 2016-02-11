import { handleActions } from 'redux-actions';

export default handleActions({
  SET_PRIVATE_LEARNING_PATH_STEP: {
    next(state, action) { return action.payload; },
    throw(state) { return state; }
  },
  LOGOUT: () => ({})
}, {});
