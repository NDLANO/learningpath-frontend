/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { isFSA } from 'flux-standard-action';
import { setAuthenticated } from '../sessionActions';

test('actions/setAuthenticated', () => {
  const actual = setAuthenticated(true);

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_AUTHENTICATED');
  expect(actual.payload).toBe(true);
  expect(actual.error).toBeFalsy();
});

test('actions/setAuthenticated with error', () => {
  const actual = setAuthenticated(new Error('fail!'));

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_AUTHENTICATED');
  expect(actual.payload.message).toBe('fail!');
  expect(actual.error).toBeTruthy();
});
