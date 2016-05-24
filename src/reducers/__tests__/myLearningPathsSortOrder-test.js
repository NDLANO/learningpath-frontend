import test from 'tape';

import reducer from '../myLearningPathsSortOrder';

test('reducers/myLearningPathsSortOrder', t => {
  /*
  t.equal(
      JSON.stringify(reducer(undefined, {})),
      'title',
      'empty action on undefined state'
  );
  */

  let actual = reducer(undefined, { type: 'SET_MY_LEARNING_PATHS_SORT_ORDER', payload: 'status' });
  t.equal(actual, 'status', 'set state');

  actual = reducer('status', { type: 'SET_MY_LEARNING_PATHS_SORT_ORDER', payload: 'title' });
  t.equal(actual, 'title', 'change state');

  actual = reducer('status', { type: 'DO_NOT_SET_MY_LEARNING_PATHS_SORT_ORDER', payload: 'title' });
  t.deepEqual(actual, 'status', 'non-actionable action type');

  actual = reducer('status', { type: 'LOGOUT' });
  t.deepEqual(actual, 'title', 'logout');

  t.end();
});
