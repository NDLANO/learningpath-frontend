/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reducer from '../user';

const name = 'Alice';
const email = 'user@example.com';
const payload = { name, email };

test('reducers/user', () => {
  expect(JSON.stringify(reducer(undefined, {}))).toBe('{}');

  expect(reducer(undefined, { type: 'SET_USER_DATA', payload })).toEqual({ name, email });

  expect(reducer({ name: 'Bob' }, { type: 'SET_USER_DATA', payload })).toEqual({ name, email });

  expect(reducer({ name: 'Bob' },
    { type: 'DO_NOT_SET_USER_DATA', payload })).toEqual({ name: 'Bob' });

  expect(reducer({ name, email },
    { type: 'SET_USER_DATA', payload: new Error('fail'), error: true })).toEqual({ name, email });

  expect(reducer({ name: 'Bob' }, { type: 'LOGOUT' })).toEqual({});
});
