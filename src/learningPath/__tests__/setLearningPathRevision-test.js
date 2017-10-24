/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { isFSA } from 'flux-standard-action';

import { setLearningPathRevision } from '../learningPathActions';


test('actions/setLearningPathRevision', () => {
  const actual = setLearningPathRevision({ id: '12345', revision: '3' });

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('UPDATE_LEARNING_PATH_REVISION');
  expect(actual.payload).toBeTruthy();
  expect(actual.payload).toEqual({ id: '12345', revision: '3' });
  expect(actual.error).toBeFalsy();
});

test('actions/setLearningPathRevision with error', () => {
  const actual = setLearningPathRevision(new Error('fail!'));

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('UPDATE_LEARNING_PATH_REVISION');
  expect(actual.payload.message).toBe('fail!');
  expect(actual.error).toBeTruthy();
});
