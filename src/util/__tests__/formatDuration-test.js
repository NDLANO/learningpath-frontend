/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import formatDuration from '../formatDuration';

test('util/formatDuration', () => {
  expect(typeof formatDuration).toBe('function');

  expect(formatDuration(1)).toBe('1 minutt');
  expect(formatDuration(30)).toBe('30 minutter');
  expect(formatDuration(59)).toBe('59 minutter');
  expect(formatDuration(60)).toBe('1 time');
  expect(formatDuration(120)).toBe('2 timer');

  expect(formatDuration(135)).toBe('2 timer 15 minutter');
  expect(formatDuration(115)).toBe('1 time 55 minutter');
  expect(formatDuration(121)).toBe('2 timer 1 minutt');

  expect(formatDuration(0)).toBe('Ukjent lengde');
  expect(formatDuration(-1)).toBe('Ukjent lengde');
  expect(formatDuration(NaN)).toBe('Ukjent lengde');
});
