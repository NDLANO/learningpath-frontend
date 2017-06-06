/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { isFSA } from 'flux-standard-action';

import { setLearningPathTags } from '../learningPathTagsActions';

test('actions/setLearningPathTags', () => {
  const actual = setLearningPathTags([{ language: 'nb', tags: ['norsk', 'norge'] }, { language: 'en', tags: ['norwegian', 'norway'] }]);

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_LEARNING_PATH_TAGS');
  expect(actual.payload).toBeTruthy();
  expect(actual.payload).toEqual([{ language: 'nb', tags: ['norsk', 'norge'] }, { language: 'en', tags: ['norwegian', 'norway'] }]);
  expect(actual.error).toBeFalsy();
});

test('actions/setLearningPathTags with error', () => {
  const actual = setLearningPathTags(new Error('fail!'));

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_LEARNING_PATH_TAGS');
  expect(actual.payload.message).toBe('fail!');
  expect(actual.error).toBeTruthy();
});
