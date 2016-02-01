import { handleActions } from 'redux-actions';

const DEFAULT = 'title';

export default handleActions({
  SORT_PRIVATE_LEARNING_PATHS: {
    next(state, action) { return action.payload; },
    throw(state) { return state; }
  },
  LOGOUT: () => DEFAULT
}, DEFAULT);
