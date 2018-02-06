/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import nock from 'nock';

export const testError = err => {
  console.error(err); // eslint-disable-line
  nock.cleanAll();
};
