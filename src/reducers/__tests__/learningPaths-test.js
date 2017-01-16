/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


import test from 'tape';

import reducer from '../learningPaths';

test('reducers/learningPaths', (t) => {
  t.deepEqual(
      reducer(undefined, {}),
      [],
      'initial state');

  t.deepEqual(
    reducer(undefined, { type: 'SET_LEARNING_PATHS', payload: ['a', 'b', 'c'] }),
    ['a', 'b', 'c'],
    'set state'
  );

  t.deepEqual(
    reducer(['a', 'b', 'c'], { type: 'SET_LEARNING_PATHS', payload: ['d', 'e', 'f'] }),
    ['d', 'e', 'f'],
    'change state'
  );

  t.deepEqual(
    reducer(['a', 'b', 'c'],
      { type: 'DO_NOT_SET_LEARNING_PATHS', payload: ['d', 'e', 'f'] }),
    ['a', 'b', 'c'],
    'non-actionable action type'
  );

  t.deepEqual(
    reducer(['a', 'b', 'c'],
      { type: 'SET_LEARNING_PATHS', payload: new Error('foobar'), error: true }),
    ['a', 'b', 'c'],
    'ignore errors'
  );

  t.end();
});

test('reducers/learningPaths remove learning path', (t) => {
  const path1 = { id: 123, title: [{ title: 'testTitle', language: 'nb' }] };
  const path2 = { id: 124, title: [{ title: 'another Title', language: 'nb' }] };
  const path3 = { id: 125, title: [{ title: 'another Title', language: 'nb' }] };

  t.deepEqual(
    reducer([path1, path2, path3], { type: 'REMOVE_LEARNING_PATH', payload: 0 }),
    [path1, path2, path3],
    'id mismatch'
  );

  t.deepEqual(
    reducer([path1, path2, path3], { type: 'REMOVE_LEARNING_PATH', payload: 123 }),
    [path2, path3],
    'remove state'
  );

  t.deepEqual(
    reducer([], { type: 'REMOVE_LEARNING_PATH', payload: 123 }),
    [],
    'empty state'
  );

  t.end();
});

test('reducers/learningPaths update learning path status', (t) => {
  const paths = [
    { id: 123, status: 'PUBLIC' },
    { id: 124, status: 'PRIVATE' },
    { id: 125, status: 'PRIVATE' },
  ];

  let actual = reducer(paths, {
    type: 'UPDATE_LEARNING_PATHS_STATUS',
    payload: { id: 125, status: 'PUBLIC' },
  });

  t.equal(paths[2].status, 'PRIVATE', 'publish');

  actual = reducer(paths, {
    type: 'UPDATE_LEARNING_PATHS_STATUS',
    payload: { id: 666, status: 'PUBLIC' },
  });

  t.deepEqual(actual, paths, 'publish unkown id');

  t.deepEqual(
    reducer([], {
      type: 'UPDATE_LEARNING_PATHS_STATUS',
      payload: { id: 1, status: 'PUBLIC' },
    }),
    [],
    'empty state'
  );

  t.end();
});
