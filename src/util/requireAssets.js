/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST); //eslint-disable-line

const requireAssets =
  process.env.BUILD_TARGET === 'server' || process.env.NODE_ENV === 'unittest'
    ? assets
    : window.assets;

export default requireAssets;
