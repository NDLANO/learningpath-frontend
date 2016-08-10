/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';

import reducer from '../authenticated';

test('reducers/authenticated', (t) => {
  t.equal(
    reducer(undefined, {}),
    false,
    'initial state'
  );

  t.equal(
    reducer(undefined, { type: 'SET_AUTHENTICATED', payload: true }),
    true,
    'set state'
  );

  t.equal(
    reducer(true, { type: 'SET_AUTHENTICATED', payload: false }),
    false,
    'change state'
  );

  t.equal(
    reducer(true, { type: 'DO_NOT_SET_AUTHENTICATED', payload: false }),
    true,
    'non-actionable action type'
  );

  t.equal(
    reducer(true, { type: 'SET_AUTHENTICATED', payload: new Error('foobar'), error: true }),
    true,
    'ignore errors'
  );

  t.equal(
    reducer(true, { type: 'LOGOUT' }),
    false,
    'logout'
  );

  t.end();
});
