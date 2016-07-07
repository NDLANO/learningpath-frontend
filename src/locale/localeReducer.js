import { handleActions } from 'redux-actions';

const initalState = 'nb';
export default handleActions({
  SET_LOCALE: {
    next: (state, action) => action.payload,
    throw: state => state,
  },
}, initalState);
