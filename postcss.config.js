/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const postcssPresetEnv = require('postcss-preset-env');
const postcssNested = require('postcss-nested');
const postcssFocus = require('postcss-focus');
const postcssColorMod = require('postcss-color-mod-function');
const postcssCustomMedia = require('postcss-custom-media');
const postcssImport = require('postcss-import');

module.exports = {
  plugins: [
    postcssImport({
      glob: true,
    }),
    postcssColorMod(),
    postcssCustomMedia(),
    postcssFocus(), // Add a :focus to every :hover
    postcssNested(),
    postcssPresetEnv(),
  ],
};
