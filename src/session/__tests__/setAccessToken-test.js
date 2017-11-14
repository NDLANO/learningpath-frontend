/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { isFSA } from 'flux-standard-action';
import { setAccessToken } from '../sessionActions';

test('actions/setAccessToken', () => {
  const actual = setAccessToken('12345');

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_ACCESS_TOKEN');
  expect(actual.payload).toBe('12345');
  expect(actual.error).toBeFalsy();
});

test('actions/setAccessToken with error', () => {
  const actual = setAccessToken(new Error('fail!'));

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_ACCESS_TOKEN');
  expect(actual.payload.message).toBe('fail!');
  expect(actual.error).toBeTruthy();
});
