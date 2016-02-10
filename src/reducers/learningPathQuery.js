import { handleActions } from 'redux-actions';

export default handleActions({
  CHANGE_LEARNING_PATH_QUERY: {
    next(state, action) { return Object.assign({}, state, action.payload); },
    throw(state) { return state; }
  }
}, {});
