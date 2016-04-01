import { handleActions } from 'redux-actions';
import findIndex from 'lodash/findIndex';
import cloneDeep from 'lodash/cloneDeep';
import pullAt from 'lodash/pullAt';

export default handleActions({
  SET_LEARNING_PATHS: {
    next: (state, action) => action.payload,
    throw: (state) => state
  },

  REMOVE_PRIVATE_LEARNING_PATH: {
    next (state, action) {
      let nextState = cloneDeep(state);
      let index = findIndex(nextState, {id: action.payload});

      if (index > -1)
        pullAt(nextState, index);

      return nextState;
    },
    throw: (state) => state
  },
}, []);
