/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import config from '../config';

const requireAssets = __CLIENT__ // eslint-disable-line no-nested-ternary
  ? window.assets
  : config.isProduction
    ? require('../../htdocs/assets/assets')
    : require('../../server/developmentAssets'); // eslint-disable-line import/no-unresolved

export default requireAssets;
