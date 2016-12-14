/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';
import { isFSA } from 'flux-standard-action';

import { setCreativeCommonLicenses, setAllLicenses } from '../edit/copyright/learningPathLicensesActions';


test('actions/setCreativeCommonLicenses', (t) => {
  const actual = setCreativeCommonLicenses([{ id: '12345' }, { id: '123456' }]);

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_CREATIVE_COMMON_LICENSES');
  t.ok(actual.payload);
  t.deepEqual(actual.payload, [{ id: '12345' }, { id: '123456' }]);
  t.notOk(actual.error);

  t.end();
});

test('actions/setCreativeCommonLicenses with error', (t) => {
  const actual = setCreativeCommonLicenses(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_CREATIVE_COMMON_LICENSES');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});


test('actions/setAllLicenses', (t) => {
  const actual = setAllLicenses([{ id: '12345' }, { id: '123456' }]);

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_ALL_LICENSES');
  t.ok(actual.payload);
  t.deepEqual(actual.payload, [{ id: '12345' }, { id: '123456' }]);
  t.notOk(actual.error);

  t.end();
});

test('actions/setAllLicenses with error', (t) => {
  const actual = setAllLicenses(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_ALL_LICENSES');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
