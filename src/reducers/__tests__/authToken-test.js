/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';

import reducer from '../accessToken';

test('reducers/accessToken', (t) => {
  t.equal(
    reducer(undefined, {}),
    'ndlatestapikey',
    'initial state'
  );

  t.equal(
    reducer(undefined, { type: 'SET_AUTH_TOKEN', payload: '12345' }),
    '12345',
    'set state'
  );

  t.equal(
    reducer('12345', { type: 'SET_AUTH_TOKEN', payload: '67890' }),
    '67890',
    'change state'
  );

  t.equal(
    reducer('12345', { type: 'DO_NOT_SET_AUTH_TOKEN', payload: 'foobar' }),
    '12345',
    'non-actionable action type'
  );

  t.equal(
    reducer('12345', { type: 'SET_AUTH_TOKEN', payload: new Error('foobar'), error: true }),
    '12345',
    'ignore errors'
  );

  t.equal(
    reducer('12345', { type: 'LOGOUT' }),
    'ndlatestapikey',
    'logout'
  );

  t.end();
});
