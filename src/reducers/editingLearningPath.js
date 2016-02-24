import { handleActions } from 'redux-actions';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import assign from 'lodash/assign';
import findIndex from 'lodash/findIndex';

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

  UPDATE_EDITING_LEARNING_PATH_STEP: {
    next(state, action) {
      let nextState = cloneDeep(state);
      let steps = get(nextState, 'learningsteps', []);
      let index = findIndex(steps, ['seqNo', action.payload.seqNo]);

      if (index === -1) {
        return state;
      }

      assign(steps[index], action.payload);
      nextState.learningsteps = steps;

      return nextState;
    },

    throw(state) { return state; }
  },

  LOGOUT: () => ({})
}, {});

