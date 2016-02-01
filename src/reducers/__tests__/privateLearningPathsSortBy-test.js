import test from 'tape';

import reducer from '../privateLearningPathsSortBy';

test('reducers/privateLearningPathsSortBy', (t) => {
  /*
  t.equal(
      JSON.stringify(reducer(undefined, {})),
      'title',
      'empty action on undefined state'
  );
  */

  let actual = reducer(undefined, { type: 'SORT_PRIVATE_LEARNING_PATHS', payload: 'status' });
  t.equal(actual, 'status', 'set state');

  actual = reducer('status', { type: 'SORT_PRIVATE_LEARNING_PATHS', payload: 'title' });
  t.equal(actual, 'title', 'change state');

  actual = reducer('status', { type: 'DO_NOT_SORT_PRIVATE_LEARNING_PATHS', payload: 'title' });
  t.deepEqual(actual, 'status', 'non-actionable action type');

  actual = reducer('status', { type: 'LOGOUT' });
  t.deepEqual(actual, 'title', 'logout');

  t.end();
});

