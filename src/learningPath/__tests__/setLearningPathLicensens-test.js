/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';
import { isFSA } from 'flux-standard-action';

import { setLearningPathLicensens } from '../edit/copyright/learningPathLicensesActions';


test('actions/setLearningPathLicensens', (t) => {
  const actual = setLearningPathLicensens([{ id: '12345' }, { id: '123456' }]);

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_LEARNING_PATH_LICENSES');
  t.ok(actual.payload);
  t.deepEqual(actual.payload, [{ id: '12345' }, { id: '123456' }]);
  t.notOk(actual.error);

  t.end();
});

test('actions/setLearningPathLicensens with error', (t) => {
  const actual = setLearningPathLicensens(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_LEARNING_PATH_LICENSES');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
