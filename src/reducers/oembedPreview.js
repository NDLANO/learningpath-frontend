import { handleActions } from 'redux-actions';
import assignOrPushPropReducer from '../util/assignOrPushPropReducer';

const intitalState = {
  oembedContent: []
};

export default handleActions({
  SET_OEMBED_PREVIEW: {
    next: assignOrPushPropReducer('oembedContent'),
    throw(state) { return state; }
  },
  SET_LEARNING_PATH_STEP: {
    next(state, action) {
      return { oembedContent: action.payload.embedContent};
    },
    throw(state) { return state; }
  },
  CREATE_EMPTY_LEARNING_PATH_STEP: () => intitalState,
  REMOVE_OEMBED_PREVIEW: () => intitalState,
}, intitalState);
