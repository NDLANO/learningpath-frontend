import { handleActions } from 'redux-actions';

export default handleActions({
  SET_USER_DATA: {
    next(state, action) { return action.payload; },
    throw(state, action) { return state; }
  },
  LOGOUT: () => ({})
}, {});
