import test from 'tape';

import reducer from '../privateLearningPaths';

const payload = [ { id: '123' }, { id: '456' } ];

test('reducers/privateLearningPaths', (t) => {
  t.equal(
    JSON.stringify(reducer(undefined, {})),
    '[]',
    'empty action on undefined state'
  );

  t.deepEqual(
    reducer(undefined, { type: 'SET_PRIVATE_LEARNING_PATHS', payload }),
    [{id: '123'}, {id: '456'}],
    'set state'
  );

  t.deepEqual(
    reducer([{id: 'abc'}, {id: 'xyz'}],
      { type: 'SET_PRIVATE_LEARNING_PATHS', payload }),
    [{id: '123'}, {id: '456'}],
    'change state'
  );

  t.deepEqual(
    reducer([{id: 'abc'}, {id: 'xyz'}],
      { type: 'DO_NOT_SET_PRIVATE_LEARNING_PATHS', payload }),
    [{id: 'abc'}, {id: 'xyz'}],
    'non-actionable action type'
  );

  t.deepEqual(
    reducer([{id: 'abc'}, {id: 'xyz'}],
      { type: 'SET_PRIVATE_LEARNING_PATHS', payload: new Error('fail'), error: true }),
    [{id: 'abc'}, {id: 'xyz'}],
    'ignore errors'
  );

  t.deepEqual(
    reducer([{id: 'abc'}, {id: 'xyz'}], { type: 'LOGOUT' }),
    [],
    'logout'
  );

  t.end();
});
