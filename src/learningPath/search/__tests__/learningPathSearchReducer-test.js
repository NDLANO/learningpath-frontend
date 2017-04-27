/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reducer from '../learningPathSearchReducer';

test('reducers/learningPathSearch query', () => {
  expect(reducer(undefined, {})).toEqual({ results: [], totalCount: 1 });

  expect(reducer(undefined, {
    type: 'SET_LEARNING_PATH_SEARCH_RESULTS',
    payload: { results: [1, 2, 3], totalCount: 30 } })).toEqual({ results: [1, 2, 3], totalCount: 30 });
});
