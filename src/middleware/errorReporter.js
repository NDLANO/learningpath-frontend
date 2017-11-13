/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ApiError } from '../sources/helpers';

const warningCodes = [401, 404];

const errorMiddlewareReporter = store => next => (action) => {
  console.log("OUTSIDE", action)
  if (action.error) {
    const error = action.payload;
    console.log('error', error)
    if (error instanceof ApiError) {
      const json = error.json;
      console.error(`${error.message} %o`, json.messages); // eslint-disable-line no-console
      if (__CLIENT__) {
        if (warningCodes.includes(action.status)) {
          window.errorReporter.captureWarning(error, { serverResponse: error.json, requestUrl: error.url });
        }
        window.errorReporter.captureError(error, { serverResponse: error.json, requestUrl: error.url });
      }
    } else {
      console.error(action.payload, action, store.getState()); // eslint-disable-line no-console
      if (__CLIENT__) {
        window.errorReporter.captureError(error);
      }
    }
  }
  return next(action);
};

export default errorMiddlewareReporter;
