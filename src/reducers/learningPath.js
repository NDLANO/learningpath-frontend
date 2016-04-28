import { handleActions } from 'redux-actions';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import assign from 'lodash/assign';
import findIndex from 'lodash/findIndex';
import assureSequenceOrder from '../util/assureSequenceOrder';

function mergeI18nProperty (propertyName) {
  return function next(state, action) {
    let nextState = cloneDeep(state);
    let properties = get(nextState, propertyName, []);
    let index = findIndex(properties, ['language', action.payload.language]);

    if (index === -1) {
      properties.push(action.payload);
    } else {
      assign(properties[index], action.payload);
    }

    nextState[propertyName] = properties;

    return nextState;
  };
}


export default handleActions({
  SET_LEARNING_PATH: {
    next(state, action) {
      return Object.assign({},
        action.payload,
        { learningsteps: assureSequenceOrder(action.payload.learningsteps) }
      );
    },
    throw(state) { return state; }
  },

  UPDATE_LEARNING_PATH_STEP: {
    next(state, action) {
      let nextState = cloneDeep(state);
      let steps = get(nextState, 'learningsteps', []);
      let index = findIndex(steps, ['seqNo', action.payload.seqNo]);

      if (index === -1) {
        steps.push(action.payload);
      } else {
        assign(steps[index], action.payload);
      }

      nextState.learningsteps = steps;

      return nextState;
    },

    throw(state) { return state; }
  },

  UPDATE_LEARNING_PATH_TITLE: {
    next: mergeI18nProperty('title'),
    throw(state) { return state; }
  },

  UPDATE_LEARNING_PATH_DESCRIPTION: {
    next: mergeI18nProperty('description'),
    throw(state) { return state; }
  },

  SORT_LEARNING_PATH_STEPS: {
    next(state, action) {
      let nextState = cloneDeep(state);
      action.payload.reduce((prev, curr, currentIndex, array) => curr.seqNo = currentIndex)
      nextState.learningsteps = action.payload;

      return nextState
    },

    throw(state) { return state; }
  },

  LOGOUT: () => ({})
}, {});
