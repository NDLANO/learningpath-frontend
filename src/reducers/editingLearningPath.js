import { handleActions } from 'redux-actions';
import cloneDeep from 'lodash/cloneDeep';

export default handleActions({
  SET_EDITING_LEARNING_PATH: {
    next(state, action) { return action.payload; },
    throw(state) { return state; }
  },

  CREATE_NEW_EDITING_LEARNING_PATH_STEP: {
    next(state) {
      let nextState = cloneDeep(state);
      nextState.learningsteps.push({
        seqNo: nextState.learningsteps.length + 1,
        title: [],
        description: [],
        embedUrl: [],
        type: '',
        license: ''
      });

      return nextState;
    },
    throw(state) { return state; }
  },

  LOGOUT: () => ({})
}, {});

