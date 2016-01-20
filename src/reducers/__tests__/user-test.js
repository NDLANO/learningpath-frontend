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

  let actual = reducer(undefined, { type: 'SET_USER_DATA', payload });
  t.equal(actual.name, name, 'set state');

  actual = reducer({name: 'Bob'}, { type: 'SET_USER_DATA', payload });
  t.equal(actual.name, name, 'change state');

  actual = reducer({name: 'Bob'}, { type: 'DO_NOT_SET_USER_DATA', payload });
  t.equal(actual.name, 'Bob', 'non-actionable action type');

  actual = reducer({name, email}, { type: 'SET_USER_DATA', payload: new Error('fail'), error: true });
  t.equal(actual.name, name, 'ignore errors');

  actual = reducer({name: 'Bob'}, { type: 'LOGOUT' });
  t.deepEqual(actual, {}, 'logout');

  t.end();
});
