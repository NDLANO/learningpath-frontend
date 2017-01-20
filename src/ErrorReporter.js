/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import TraceKit from 'tracekit';
import uuid from './util/uuid';


const ErrorReporter = (function () {
  let instance;

  const LOGGLY_URL = 'https://logs-01.loggly.com';
  const sessionId = uuid();

  function sendToLoggly(data, config) {
    // Don't send to loggly if environment is undefined
    if (!config.environment) {
      return;
    }

    const body = {
      ...data,
      sessionId,
      appName: `${config.environment}/${config.componentName}`,
    };

    fetch(`${LOGGLY_URL}/inputs/${config.logglyApiKey}/`, {
      method: 'POST',
      body: JSON.stringify(body),
    }).then((res) => {
      console.log(res);
    });
  }
  // function processException() {
  //
  // }

  function init(config) {
     // Singleton
    console.log(config);

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
