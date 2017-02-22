/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';

import transformHttpToHttps from '../urlTransformer';

test('util/transformHttpToHttps http changes to https', (t) => {
  t.equal(typeof transformHttpToHttps, 'function');

  t.equal(transformHttpToHttps('http://ndla.no/3'), 'https://ndla.no/3');

  t.end();
});


test('util/transformHttpToHttps https does not change', (t) => {
  t.equal(typeof transformHttpToHttps, 'function');

  t.equal(transformHttpToHttps('https://ndla.no/3'), 'https://ndla.no/3');

  t.end();
});
