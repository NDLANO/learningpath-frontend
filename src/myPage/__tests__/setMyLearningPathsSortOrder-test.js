/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { isFSA } from 'flux-standard-action';
import { setMyLearningPathsSortOrder } from '../myPageActions';

test('actions/setMyLearningPathsSortOrder', () => {
  const actual = setMyLearningPathsSortOrder('lastUpdated');

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_MY_LEARNING_PATHS_SORT_ORDER');
  expect(actual.payload).toBe('lastUpdated');
  expect(actual.error).toBeFalsy();
});

test('actions/setMyLearningPathsSortOrder with error', () => {
  const actual = setMyLearningPathsSortOrder(new Error('fail!'));

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_MY_LEARNING_PATHS_SORT_ORDER');
  expect(actual.payload.message).toBe('fail!');
  expect(actual.error).toBeTruthy();
});
