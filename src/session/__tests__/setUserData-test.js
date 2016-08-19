/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';
import { isFSA } from 'flux-standard-action';
import { setUserData } from '../sessionActions';


test('actions/setUserData', (t) => {
  const actual = setUserData({
    name: 'Alice', email: 'alice@example.com',
  });

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_USER_DATA');
  t.ok(actual.payload);
  t.deepEqual(actual.payload, {
    name: 'Alice',
    email: 'alice@example.com',
  });
  t.notOk(actual.error);

  t.end();
});

test('actions/setUserData with error', (t) => {
  const actual = setUserData(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_USER_DATA');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
