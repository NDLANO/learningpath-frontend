/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reducer from '../learningPaths';

test('reducers/learningPaths', () => {
  expect(reducer(undefined, {})).toEqual([]);

  expect(
    reducer(undefined, {
      type: 'SET_LEARNING_PATHS',
      payload: ['a', 'b', 'c'],
    }),
  ).toEqual(['a', 'b', 'c']);

  expect(
    reducer(['a', 'b', 'c'], {
      type: 'SET_LEARNING_PATHS',
      payload: ['d', 'e', 'f'],
    }),
  ).toEqual(['d', 'e', 'f']);

  expect(
    reducer(['a', 'b', 'c'], {
      type: 'DO_NOT_SET_LEARNING_PATHS',
      payload: ['d', 'e', 'f'],
    }),
  ).toEqual(['a', 'b', 'c']);

  expect(
    reducer(['a', 'b', 'c'], {
      type: 'SET_LEARNING_PATHS',
      payload: new Error('foobar'),
      error: true,
    }),
  ).toEqual(['a', 'b', 'c']);
});

test('reducers/learningPaths remove learning path', () => {
  const path1 = { id: 123, title: [{ title: 'testTitle', language: 'nb' }] };
  const path2 = {
    id: 124,
    title: [{ title: 'another Title', language: 'nb' }],
  };
  const path3 = {
    id: 125,
    title: [{ title: 'another Title', language: 'nb' }],
  };

  expect(
    reducer([path1, path2, path3], {
      type: 'REMOVE_LEARNING_PATH',
      payload: 0,
    }),
  ).toEqual([path1, path2, path3]);

  expect(
    reducer([path1, path2, path3], {
      type: 'REMOVE_LEARNING_PATH',
      payload: 123,
    }),
  ).toEqual([path2, path3]);

  expect(reducer([], { type: 'REMOVE_LEARNING_PATH', payload: 123 })).toEqual(
    [],
  );
});

test('reducers/learningPaths update learning path status', () => {
  const paths = [
    { id: 123, status: 'PUBLIC' },
    { id: 124, status: 'PRIVATE' },
    { id: 125, status: 'PRIVATE' },
  ];

  let actual = reducer(paths, {
    type: 'UPDATE_LEARNING_PATHS_STATUS',
    payload: { id: 125, status: 'PUBLIC' },
  });

  expect(paths[2].status).toBe('PRIVATE');

  actual = reducer(paths, {
    type: 'UPDATE_LEARNING_PATHS_STATUS',
    payload: { id: 666, status: 'PUBLIC' },
  });

  expect(actual).toEqual(paths);

  expect(
    reducer([], {
      type: 'UPDATE_LEARNING_PATHS_STATUS',
      payload: { id: 1, status: 'PUBLIC' },
    }),
  ).toEqual([]);
});
