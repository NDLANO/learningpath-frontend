/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import test from 'tape';

import reducer from '../learningPathSearchReducer';

test('reducers/learningPathSearch query', (t) => {
  t.deepEqual(
    reducer(undefined, {}),
    { results: [] },
    'initial state'
  );

  t.deepEqual(
    reducer(undefined, { type: 'SET_LEARNING_PATH_SEARCH_RESULTS', payload: [1, 2, 3] }),
    { results: [1, 2, 3] },
    'set learning path search results'
  );

  t.end();
});
