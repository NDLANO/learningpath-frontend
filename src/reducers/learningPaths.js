import { handleActions } from 'redux-actions';

export default handleActions({
  SET_LEARNING_PATHS: {
    next: (state, action) => action.payload,
    throw: (state) => state
  }
}, []);
