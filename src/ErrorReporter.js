/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import TraceKit from 'tracekit';
import uuid from './util/uuid';

import send from './logglyApi';

const ErrorReporter = (function () {
  let instance;

  const sessionId = uuid();

  function sendToLoggly(initialData, config) {
    // Don't send to loggly if environment is undefined
    if (!config.environment) {
      return;
    }

    const data = {
      ...initialData,
      sessionId,
      appName: `${config.environment}/${config.componentName}`,
    };

    send(config.logglyApiKey, data);
  }

  // function processException() {
  //
  // }

  function init(config) {
    TraceKit.report.subscribe((stackInfo, options) => {
      console.log(stackInfo, options);
    });

    return {
      captureMessage(msg) {
        sendToLoggly({ text: msg, level: 'info' }, config);
      },
    };
  }

  return {
    getInstance(config) {
      if (!instance) {
        instance = init(config);
      }

      return instance;
    },
  };
}());

export default ErrorReporter;
