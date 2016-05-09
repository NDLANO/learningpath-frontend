import { handleActions } from 'redux-actions';

const DEFAULT = 'title';

export default handleActions({
  SET_MY_LEARNING_PATHS_SORT_ORDER: {
    next(state, action) { return action.payload; },
    throw(state) { return state; }
  },
  LOGOUT: () => DEFAULT
}, DEFAULT);
