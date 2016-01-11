import { handleActions } from 'redux-actions';

export default handleActions({
  SET_AUTH_TOKEN: {
    next(state, action) { return action.payload; },
    throw(state, action) { return state; }
  }
}, '');
