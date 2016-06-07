
import { handleActions } from 'redux-actions';

const initialState = {
  all: [],
  hasFetched: false,
};

export default handleActions({
  SET_LEARNING_PATH_TAGS: {
    next(state, action) {
      return Object.assign({},
        {
          all: action.payload,
          hasFetched: true,
        }
      );
    },
    throw(state) { return state; }
  },
}, initialState);
