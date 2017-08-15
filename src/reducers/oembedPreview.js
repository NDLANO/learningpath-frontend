/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { handleActions } from 'redux-actions';

const intitalState = {
  oembedContent: {},
};

export default handleActions({
  SET_OEMBED_PREVIEW: {
    next(state, action) {
      return { oembedContent: action.payload };
    },
    throw(state) { return state; },
  },
  SET_LEARNING_PATH_STEP: {
    next(state, action) {
      return { oembedContent: action.payload.embedContent };
    },
    throw(state) { return state; },
  },
  CREATE_EMPTY_LEARNING_PATH_STEP: () => intitalState,
  REMOVE_OEMBED_PREVIEW: () => intitalState,
}, intitalState);
