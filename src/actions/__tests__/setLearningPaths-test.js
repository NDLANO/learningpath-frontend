/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';
import { isFSA } from 'flux-standard-action';
import { setLearningPaths } from '..';


test('actions/setLearningPaths', (t) => {
  const actual = setLearningPaths([
      { id: '12345' }, { id: '67890' },
  ]);

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_LEARNING_PATHS');
  t.deepEqual(actual.payload, [{ id: '12345' }, { id: '67890' }]);
  t.notOk(actual.error);

  t.end();
});

test('actions/setLearningPaths with error', (t) => {
  const actual = setLearningPaths(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_LEARNING_PATHS');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
