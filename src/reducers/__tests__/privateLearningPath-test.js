import test from 'tape';

import reducer from '../privateLearningPath';

const payload = { id: '123' };

test('reducers/privateLearningPath', (t) => {
  t.equal(
      JSON.stringify(reducer(undefined, {})),
      '{}',
      'empty action on undefined state'
  );

  let actual = reducer(undefined, { type: 'SET_PRIVATE_LEARNING_PATH', payload });
  t.deepEqual(actual, {id: '123'}, 'set state');

  actual = reducer({id: 'abc'}, { type: 'SET_PRIVATE_LEARNING_PATH', payload });
  t.deepEqual(actual, {id: '123'}, 'change state');

  actual = reducer({id: 'abc'}, { type: 'DO_NOT_SET_PRIVATE_LEARNING_PATH', payload });
  t.deepEqual(actual, {id: 'abc'}, 'non-actionable action type');

  actual = reducer({id: 'abc'}, { type: 'SET_PRIVATE_LEARNING_PATH', payload: new Error('fail'), error: true });
  t.deepEqual(actual, {id: 'abc'}, 'ignore errors');

  actual = reducer({id: 'abc'}, { type: 'LOGOUT' });
  t.deepEqual(actual, {}, 'logout');

  t.end();
});
