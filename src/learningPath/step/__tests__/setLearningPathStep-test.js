/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';
import { isFSA } from 'flux-standard-action';
import { setLearningPathStep } from '../learningPathStepActions';


test('actions/setLearningPathStep', t => {
  const actual = setLearningPathStep({ id: '12345' });

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_LEARNING_PATH_STEP');
  t.ok(actual.payload);
  t.deepEqual(actual.payload, { id: '12345' });
  t.notOk(actual.error);

  t.end();
});

test('actions/setLearningPathStep with error', t => {
  const actual = setLearningPathStep(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_LEARNING_PATH_STEP');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
