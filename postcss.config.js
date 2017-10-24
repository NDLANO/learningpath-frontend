/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const easyImport = require('postcss-easy-import');
const cssnext = require('postcss-cssnext');
const postcssNested = require('postcss-nested');
const postcssFocus = require('postcss-focus');

module.exports = {
  plugins: [
    easyImport({
      glob: true,
    }),
    postcssFocus(), // Add a :focus to every :hover
    postcssNested(),
    cssnext({
      // Allow future CSS features to be used, also auto-prefixes the CSS...
      browsers: ['last 2 versions', 'IE >= 10'], // ...based on this browser list
    }),
  ],
};
