/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { isFSA } from 'flux-standard-action';
import { setUserData } from '../sessionActions';


test('actions/setUserData', () => {
  const actual = setUserData({
    name: 'Alice', email: 'alice@example.com',
  });

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_USER_DATA');
  expect(actual.payload).toBeTruthy();
  expect(actual.payload).toEqual({
    name: 'Alice',
    email: 'alice@example.com',
  });
  expect(actual.error).toBeFalsy();
});

test('actions/setUserData with error', () => {
  const actual = setUserData(new Error('fail!'));

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_USER_DATA');
  expect(actual.payload.message).toBe('fail!');
  expect(actual.error).toBeTruthy();
});
