import test from 'tape';

import reducer from './privateLearningPaths';

const payload = [ { id: '123' }, { id: '456' } ];

test('reducers/privateLearningPaths', (t) => {
  t.equal(
      JSON.stringify(reducer(undefined, {})),
      '{}',
      'empty action on undefined state'
  );

  let actual = reducer(undefined, { type: 'SET_PRIVATE_LEARNING_PATHS', payload });
  t.deepEqual(actual, [{id: '123'}, {id: '456'}], 'set state');

  actual = reducer([{id: 'abc'}, {id: 'xyz'}], { type: 'SET_PRIVATE_LEARNING_PATHS', payload });
  t.deepEqual(actual, [{id: '123'}, {id: '456'}], 'change state');

  actual = reducer([{id: 'abc'}, {id: 'xyz'}], { type: 'DO_NOT_SET_PRIVATE_LEARNING_PATHS', payload });
  t.deepEqual(actual, [{id: 'abc'}, {id: 'xyz'}], 'non-actionable action type');

  actual = reducer([{id: 'abc'}, {id: 'xyz'}], { type: 'SET_PRIVATE_LEARNING_PATHS', payload: new Error('fail'), error: true });
  t.deepEqual(actual, [{id: 'abc'}, {id: 'xyz'}], 'ignore errors');

  t.end();
});
