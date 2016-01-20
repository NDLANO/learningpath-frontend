import { handleActions } from 'redux-actions';

export default handleActions({
  SET_AUTHENTICATED: {
    next: (state, action) => action.payload,
    throw: (state, action) => state
  },
  LOGOUT: () => false
}, false);
