import test from 'tape';

import reducer from '../user';

const name = 'Alice';
const email = 'user@example.com';
const payload = { name, email };

test('reducers/user', (t) => {
  t.equal(
    JSON.stringify(reducer(undefined, {})),
    '{}',
    'empty action on undefined state'
  );

  t.deepEqual(
    reducer(undefined, { type: 'SET_USER_DATA', payload }),
    name,
    'set state'
  );

  t.deepEqual(
    reducer({name: 'Bob'}, { type: 'SET_USER_DATA', payload }),
    name,
    'change state'
  );

  t.deepEqual(
    reducer({name: 'Bob'},
      { type: 'DO_NOT_SET_USER_DATA', payload }),
    'Bob',
    'non-actionable action type'
  );

  t.deepEqual(
    reducer({name, email},
      { type: 'SET_USER_DATA', payload: new Error('fail'), error: true }),
    name,
    'ignore errors'
  );

  t.deepEqual(
    reducer({name: 'Bob'}, { type: 'LOGOUT' }),
    {},
    'logout'
  );

  t.end();
});
