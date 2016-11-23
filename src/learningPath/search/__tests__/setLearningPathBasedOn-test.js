/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';
import { isFSA } from 'flux-standard-action';
import { setLearningPathBasedOn } from '../learningPathSearchActions';


test('actions/setLearningPathBasedOn', (t) => {
  const actual = setLearningPathBasedOn({
    results: { title: 'hei' },
    index: 1,
  });

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_LEARNING_PATH_BASED_ON');
  t.deepEqual(actual.payload, {
    results: { title: 'hei' },
    index: 1,
  });
  t.notOk(actual.error);

  t.end();
});

test('actions/setLearningPathBasedOn with error', (t) => {
  const actual = setLearningPathBasedOn(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_LEARNING_PATH_BASED_ON');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
