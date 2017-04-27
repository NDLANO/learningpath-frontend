/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import formatDate from '../formatDate';

test('util/formatDate', () => {
  expect(typeof formatDate).toBe('function');

  expect(formatDate('2014-12-24T10:44:06Z', 'nb')).toBe('24.12.14');
  expect(formatDate('1978-03-07T15:00:00Z', 'nb')).toBe('07.03.78');
});
