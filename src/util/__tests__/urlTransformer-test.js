/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';

import { transformHttpToHttps, removeSlashOembed, transformNdlaUrl } from '../urlTransformer';

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


test('util/removeSlashOembed removes /oembed', (t) => {
  t.equal(typeof removeSlashOembed, 'function');

  t.equal(removeSlashOembed('https://ndla.no/3/oembed'), 'https://ndla.no/3');

  t.end();
});


test('util/removeSlashOembed url does not change', (t) => {
  t.equal(typeof removeSlashOembed, 'function');

  t.equal(removeSlashOembed('https://ndla.no/3'), 'https://ndla.no/3');

  t.end();
});


test('util/transformNdlaUrl removes /oembed and adds https', (t) => {
  t.equal(typeof transformNdlaUrl, 'function');

  t.equal(transformNdlaUrl('http://ndla.no/3/oembed'), 'https://ndla.no/3');

  t.end();
});


test('util/transformNdlaUrl url does not change', (t) => {
  t.equal(typeof transformNdlaUrl, 'function');

  t.equal(transformNdlaUrl('https://ndla.no/3'), 'https://ndla.no/3');

  t.end();
});
