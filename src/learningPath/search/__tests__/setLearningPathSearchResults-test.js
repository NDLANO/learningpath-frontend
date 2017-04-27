/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { isFSA } from 'flux-standard-action';
import { setLearningPathSearchResults } from '../learningPathSearchActions';


test('actions/setLearningPathSearchResults', () => {
  const actual = setLearningPathSearchResults({
    results: [{ id: '12345' }, { id: '67890' }],
    totalCount: 300,
  });

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_LEARNING_PATH_SEARCH_RESULTS');
  expect(actual.payload).toEqual({
    results: [{ id: '12345' }, { id: '67890' }],
    totalCount: 300,
  });
  expect(actual.error).toBeFalsy();
});

test('actions/setLearningPathSearchResults with error', () => {
  const actual = setLearningPathSearchResults(new Error('fail!'));

  expect(isFSA(actual)).toBeTruthy();

  expect(actual.type).toBe('SET_LEARNING_PATH_SEARCH_RESULTS');
  expect(actual.payload.message).toBe('fail!');
  expect(actual.error).toBeTruthy();
});
