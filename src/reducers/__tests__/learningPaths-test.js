
import test from 'tape';

import reducer from '../learningPaths';

test('reducers/learningPaths', (t) => {
  t.deepEqual(
      reducer(undefined, {}),
      [],
      'initial state');

  t.deepEqual(
    reducer(undefined, {type: 'SET_LEARNING_PATHS', payload: ['a', 'b', 'c']}),
    ['a', 'b', 'c'],
    'set state'
  );

  t.deepEqual(
    reducer(['a', 'b', 'c'], {type: 'SET_LEARNING_PATHS', payload: ['d', 'e', 'f']}),
    ['d', 'e', 'f'],
    'change state'
  );

  t.deepEqual(
    reducer(['a', 'b', 'c'],
      {type: 'DO_NOT_SET_LEARNING_PATHS', payload: ['d', 'e', 'f']}),
    ['a', 'b', 'c'],
    'non-actionable action type'
  );

  t.deepEqual(
    reducer(['a', 'b', 'c'],
      {type: 'SET_LEARNING_PATHS', payload: new Error('foobar'), error: true }),
    ['a', 'b', 'c'],
    'ignore errors'
  );

  t.end();
});

test('reducers/learningPaths remove learning path', (t) => {
  let path1 = {id: 123, title: [{title: "testTitle", language: "nb"}]};
  let path2 = {id: 124, title: [{title: "another Title", language: "nb"}]};
  let path3 = {id: 125, title: [{title: "another Title", language: "nb"}]};

  t.deepEqual(
    reducer(undefined, {type: 'REMOVE_PRIVATE_LEARNING_PATH'}),
    [],
    'initial state'
  );

  t.deepEqual(
    reducer([path1, path2, path3], {type: 'REMOVE_PRIVATE_LEARNING_PATH', payload: 0}),
    [path1, path2, path3],
    'id mismatch'
  );

  t.deepEqual(
    reducer([path1, path2, path3], {type: 'REMOVE_PRIVATE_LEARNING_PATH', payload: 123}),
    [path2, path3],
    'remove state'
  );

  t.deepEqual(
    reducer([], {type: 'REMOVE_PRIVATE_LEARNING_PATH', payload: 123}),
    [],
    'empty state'
  );

  t.end();
});
