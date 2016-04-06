import { handleActions } from 'redux-actions';
import { defaultApiKey  } from '../sources/helpers'

export default handleActions({
  SET_AUTH_TOKEN: {
    next(state, action) { return action.payload; },
    throw(state, action) { return state; }
  },
  LOGOUT: () => defaultApiKey
}, defaultApiKey);
