/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reducer from '../accessToken';

test('reducers/accessToken', () => {
  expect(reducer(undefined, {})).toBe('ndlatestapikey');

  expect(reducer(undefined, { type: 'SET_ACCESS_TOKEN', payload: '12345' })).toBe('12345');

  expect(reducer('12345', { type: 'SET_ACCESS_TOKEN', payload: '67890' })).toBe('67890');

  expect(reducer('12345', { type: 'DO_NOT_SET_ACCESS_TOKEN', payload: 'foobar' })).toBe('12345');

  expect(
    reducer('12345', { type: 'SET_ACCESS_TOKEN', payload: new Error('foobar'), error: true })
  ).toBe('12345');
});
