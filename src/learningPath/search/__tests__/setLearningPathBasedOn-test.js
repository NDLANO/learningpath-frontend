/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { isFSA } from 'flux-standard-action';
import { setLearningPathBasedOn } from '../learningPathSearchActions';


test('actions/setLearningPathBasedOn', () => {
  const actual = setLearningPathBasedOn({
    results: { title: 'hei' },
    index: 1,
  });

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_LEARNING_PATH_BASED_ON');
  expect(actual.payload).toEqual({
    results: { title: 'hei' },
    index: 1,
  });
  expect(actual.error).toBeFalsy();
});

test('actions/setLearningPathBasedOn with error', () => {
  const actual = setLearningPathBasedOn(new Error('fail!'));

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_LEARNING_PATH_BASED_ON');
  expect(actual.payload.message).toBe('fail!');
  expect(actual.error).toBeTruthy();
});
