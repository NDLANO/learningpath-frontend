import test from 'tape';

import reducer from '../learningPath';

const payload = { id: '123' };

test('reducers/learningPath', (t) => {
  t.equal(
    JSON.stringify(reducer(undefined, {})),
    '{}',
    'empty action on undefined state'
  );

  t.deepEqual(
    reducer(undefined, { type: 'SET_LEARNING_PATH', payload }),
    {id: '123'},
    'set state'
  );

  t.deepEqual(
    reducer({id: 'abc'}, { type: 'SET_LEARNING_PATH', payload }),
    {id: '123'},
    'change state'
  );

  t.deepEqual(
    reducer({id: 'abc'},
      { type: 'DO_NOT_SET_LEARNING_PATH', payload }),
    {id: 'abc'},
    'non-actionable action type'
  );

  t.deepEqual(
    reducer({id: 'abc'},
      { type: 'SET_LEARNING_PATH', payload: new Error('fail'), error: true }),
    {id: 'abc'},
    'ignore errors'
  );

  t.end();
});
