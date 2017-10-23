/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable no-unused-vars */
import * as sessionActions from '../session/sessionActions';
/* eslint-enable */

const TokenStatusHandler = (function Singleton() {
  let instance;

  function init(config) {
    return {
      config,
      getStoreState() {
        return instance.config.store.getState();
      },
      getDispatch() {
        return instance.config.store.dispatch;
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

export default TokenStatusHandler;
