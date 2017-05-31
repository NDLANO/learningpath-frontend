/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { isFSA } from 'flux-standard-action';

import { setCreativeCommonLicenses, setAllLicenses } from '../learningPathLicensesActions';


test('actions/setCreativeCommonLicenses', () => {
  const actual = setCreativeCommonLicenses([{ id: '12345' }, { id: '123456' }]);

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_CREATIVE_COMMON_LICENSES');
  expect(actual.payload).toBeTruthy();
  expect(actual.payload).toEqual([{ id: '12345' }, { id: '123456' }]);
  expect(actual.error).toBeFalsy();
});

test('actions/setCreativeCommonLicenses with error', () => {
  const actual = setCreativeCommonLicenses(new Error('fail!'));

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_CREATIVE_COMMON_LICENSES');
  expect(actual.payload.message).toBe('fail!');
  expect(actual.error).toBeTruthy();
});


test('actions/setAllLicenses', () => {
  const actual = setAllLicenses([{ id: '12345' }, { id: '123456' }]);

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_ALL_LICENSES');
  expect(actual.payload).toBeTruthy();
  expect(actual.payload).toEqual([{ id: '12345' }, { id: '123456' }]);
  expect(actual.error).toBeFalsy();
});

test('actions/setAllLicenses with error', () => {
  const actual = setAllLicenses(new Error('fail!'));

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_ALL_LICENSES');
  expect(actual.payload.message).toBe('fail!');
  expect(actual.error).toBeTruthy();
});
