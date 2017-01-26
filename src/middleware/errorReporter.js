/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ApiError } from '../sources/helpers';

const errorMiddlewareReporter = store => next => (action) => {
  if (action.error) {
    const error = action.payload;
    if (error instanceof ApiError) {
      const json = error.json;
      console.error(`${error.message} %o`, json.messages); // eslint-disable-line no-console
      window.errorReporter.captureError(error, { serverResponse: error.json, requestUrl: error.url });
    } else {
      console.error(action.payload, action, store.getState()); // eslint-disable-line no-console
      window.errorReporter.captureError(error);
    }
  }

  return next(action);
};

export default errorMiddlewareReporter;
