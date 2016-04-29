import { handleActions } from 'redux-actions';
import cloneDeep from 'lodash/cloneDeep';
import assign from 'lodash/assign';
import assignOrPushPropReducer from '../util/assignOrPushPropReducer';

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
    next: assignOrPushPropReducer('description'),
    throw(state) { return state; }
  },
  UPDATE_LEARNING_PATH_STEP_TITLE: {
    next: assignOrPushPropReducer('title'),
    throw(state) { return state; }
  },
  UPDATE_LEARNING_PATH_STEP_TYPE: {
    next (state, action) {
      return assign(cloneDeep(state), {type: action.payload});
    },
    throw(state) { return state; }
  },
  UPDATE_LEARNING_PATH_STEP_EMBED_URL: {
    next: assignOrPushPropReducer('embedContent'),
    throw(state) { return state; }
  },
  REMOVE_LEARNING_PATH_STEP_EMBED_CONTENT: {
    next(state, action) {
      let nextState = cloneDeep(state);
      nextState.embedContent = [];
      return nextState;
    },
    throw(state) { return state; }
  },

  CREATE_EMPTY_LEARNING_PATH_STEP: {
    next() {
      return {
        title: [],
        description: [],
        embedContent: [],
        type: '',
        license: ''
      };
    },
    throw(state) { return state; }
  },
  LOGOUT: () => ({})
}, {});
