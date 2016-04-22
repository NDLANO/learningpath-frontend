import { handleActions } from 'redux-actions';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import assign from 'lodash/assign';
import findIndex from 'lodash/findIndex';

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
  SET_LEARNING_PATH_STEP: {
    next(state, action) { return action.payload; },
    throw(state) { return state; }
  },
  SET_OEMBED_OBJECT: {
    next (state, action) {
      let nextState = cloneDeep(state);
      nextState.oembed = action.payload;
      return nextState;
    },
    throw(state) { return state; }
  },
  UPDATE_LEARNING_PATH_STEP_DESCRIPTION: {
    next: mergeI18nProperty('description'),
    throw(state) { return state; }
  },
  UPDATE_LEARNING_PATH_STEP_TITLE: {
    next: mergeI18nProperty('title'),
    throw(state) { return state; }
  },
  UPDATE_LEARNING_PATH_STEP_TYPE: {
    next (state, action) {
      let nextState = cloneDeep(state);
      nextState.type = action.payload;
      return nextState;
    },
    throw(state) { return state; }
  },
  UPDATE_LEARNING_PATH_STEP_EMBED_URL: {
    next: mergeI18nProperty('embedContent'),
    throw(state) { return state; }
  },
  LOGOUT: () => ({})
}, {});
