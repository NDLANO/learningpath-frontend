import test from 'tape';

import reducer from '../privateLearningPath';

const payload = { id: '123' };

test('reducers/privateLearningPath', (t) => {
  t.equal(
    JSON.stringify(reducer(undefined, {})),
    '{}',
    'empty action on undefined state'
  );

  t.deepEqual(
    reducer(undefined, { type: 'SET_PRIVATE_LEARNING_PATH', payload }),
    {id: '123', learningsteps: []},
    'set state'
  );

  t.deepEqual(
    reducer({id: 'abc'}, { type: 'SET_PRIVATE_LEARNING_PATH', payload }),
    {id: '123', learningsteps: []},
    'change state'
  );

  t.deepEqual(
    reducer({id: 'abc'},
      { type: 'DO_NOT_SET_PRIVATE_LEARNING_PATH', payload }),
    {id: 'abc'},
    'non-actionable action type'
  );

  t.deepEqual(
    reducer({id: 'abc'},
      { type: 'SET_PRIVATE_LEARNING_PATH', payload: new Error('fail'), error: true }),
    {id: 'abc'},
    'ignore errors'
  );

  t.deepEqual(
    reducer({id: 'abc'}, { type: 'LOGOUT' }),
    {},
    'logout'
  );

  t.end();
});
