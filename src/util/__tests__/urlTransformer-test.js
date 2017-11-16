/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  transformHttpToHttps,
  removeSlashOembed,
  transformNdlaUrl,
} from '../urlTransformer';

test('util/transformHttpToHttps http changes to https', () => {
  expect(typeof transformHttpToHttps).toBe('function');

  expect(transformHttpToHttps('http://ndla.no/3')).toBe('https://ndla.no/3');
});

test('util/transformHttpToHttps https does not change', () => {
  expect(typeof transformHttpToHttps).toBe('function');

  expect(transformHttpToHttps('https://ndla.no/3')).toBe('https://ndla.no/3');
});

test('util/removeSlashOembed removes /oembed', () => {
  expect(typeof removeSlashOembed).toBe('function');

  expect(removeSlashOembed('https://ndla.no/3/oembed')).toBe(
    'https://ndla.no/3',
  );
});

test('util/removeSlashOembed url does not change', () => {
  expect(typeof removeSlashOembed).toBe('function');

  expect(removeSlashOembed('https://ndla.no/3')).toBe('https://ndla.no/3');
});

test('util/transformNdlaUrl removes /oembed and adds https', () => {
  expect(typeof transformNdlaUrl).toBe('function');

  expect(transformNdlaUrl('http://ndla.no/3/oembed')).toBe('https://ndla.no/3');
});

test('util/transformNdlaUrl url does not change', () => {
  expect(typeof transformNdlaUrl).toBe('function');

  expect(transformNdlaUrl('https://ndla.no/3')).toBe('https://ndla.no/3');
});
