import test from 'tape';

import reducer from '../learningPathsTotalCount';

test('reducers/learningPathsTotalCount', t => {
  t.equal(
    reducer(undefined, {}),
    1,
    'initial state'
  );

  t.equal(
    reducer(undefined, { type: 'SET_LEARNING_PATHS_TOTAL_COUNT', payload: 123 }),
    123,
    'set state'
  );

  t.equal(
    reducer(123, { type: 'SET_LEARNING_PATHS_TOTAL_COUNT', payload: 567 }),
    567,
    'change state'
  );

  t.equal(
    reducer(123, { type: 'DO_NOT_SET_LEARNING_PATHS_TOTAL_COUNT', payload: 666 }),
    123,
    'non-actionable action type'
  );

  t.equal(
    reducer(123, { type: 'SET_LEARNING_PATHS_TOTAL_COUNT', payload: new Error('foobar'), error: true }),
    123,
    'ignore errors'
  );

  t.end();
});
