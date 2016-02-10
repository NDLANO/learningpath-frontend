
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
