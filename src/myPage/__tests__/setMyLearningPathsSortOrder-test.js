/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';
import { isFSA } from 'flux-standard-action';
import { setMyLearningPathsSortOrder } from '../myPageActions';

test('actions/setMyLearningPathsSortOrder', t => {
  const actual = setMyLearningPathsSortOrder('lastUpdated');

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_MY_LEARNING_PATHS_SORT_ORDER');
  t.equal(actual.payload, 'lastUpdated');
  t.notOk(actual.error);

  t.end();
});

test('actions/setMyLearningPathsSortOrder with error', t => {
  const actual = setMyLearningPathsSortOrder(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_MY_LEARNING_PATHS_SORT_ORDER');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
