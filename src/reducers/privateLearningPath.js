import { handleActions } from 'redux-actions';
import assureSequenceOrder from '../util/assureSequenceOrder';

export default handleActions({
  SET_PRIVATE_LEARNING_PATH: {
    next(state, action) {
      return Object.assign({},
        action.payload,
        { learningsteps: assureSequenceOrder(action.payload.learningsteps) }
      );
    },
    throw(state) { return state; }
  },
  LOGOUT: () => ({})
}, {});
