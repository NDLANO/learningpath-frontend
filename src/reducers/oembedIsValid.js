import { handleActions } from 'redux-actions';

export default handleActions({
  SET_IS_VALID_OEMBED: {
    next(state, action) { return action.payload; },
    throw(state) { return state; }
  }
}, true);
