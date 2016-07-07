import { handleActions } from 'redux-actions';

export default handleActions({
  SET_USER_DATA: {
    next: (state, action) => action.payload,
    throw: state => state,
  },
  LOGOUT: () => ({}),
}, {});
