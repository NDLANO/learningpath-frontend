import { handleActions } from 'redux-actions';
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';

export default handleActions({
  SET_LEARNING_PATHS: {
    next: (state, action) => action.payload,
    throw: (state) => state
  },

  REMOVE_PRIVATE_LEARNING_PATH: {
    next (state, action) {
      let index = findIndex(state, {id: action.payload});
      return [...state.slice(0, index), ...state.slice(index + 1)];
    },
    throw: (state) => state
  },
}, []);
