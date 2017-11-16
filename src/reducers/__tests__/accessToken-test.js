/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reducer from '../accessToken';

test('reducers/accessToken', () => {
  expect(reducer(undefined, {})).toEqual({ expiresAt: 0, token: '' });

  expect(
    reducer(undefined, {
      type: 'SET_ACCESS_TOKEN',
      payload: { expiresAt: 123456789, token: '12345' },
    }),
  ).toEqual({ expiresAt: 123456789, token: '12345' });

  expect(
    reducer(
      { expiresAt: 123456789, token: '12345' },
      {
        type: 'SET_ACCESS_TOKEN',
        payload: { expiresAt: 123456780, token: '67890' },
      },
    ),
  ).toEqual({ expiresAt: 123456780, token: '67890' });

  expect(
    reducer(
      { expiresAt: 123456789, token: '12345' },
      {
        type: 'DO_NOT_SET_ACCESS_TOKEN',
        payload: { expiresAt: 123456789, token: 'foobar' },
      },
    ),
  ).toEqual({ expiresAt: 123456789, token: '12345' });

  expect(
    reducer(
      { expiresAt: 123456789, token: '12345' },
      {
        type: 'SET_ACCESS_TOKEN',
        payload: new Error({ expiresAt: 123456789, token: 'foobar' }),
        error: true,
      },
    ),
  ).toEqual({ expiresAt: 123456789, token: '12345' });
});
