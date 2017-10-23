/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const easyImport = require('postcss-easy-import');
const stylelint = require('stylelint');
const cssNext = require('postcss-cssnext');
const reporter = require('postcss-reporter');

module.exports = {
  plugins: [
    easyImport({ glob: true }),
    stylelint(),
    cssNext({
      browsers: ['last 2 versions', '> 5%'],
    }),
    reporter({ clearMessages: true }),
  ],
};
