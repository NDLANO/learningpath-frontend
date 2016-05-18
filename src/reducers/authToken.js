import { handleActions } from 'redux-actions';
import {defaultApiKey} from '../sources/helpers';

export default handleActions({
  SET_AUTH_TOKEN: {
    next: (state, action) => action.payload,
    throw: state => state
  },
  LOGOUT: () => defaultApiKey
}, defaultApiKey);
