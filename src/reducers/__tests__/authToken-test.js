import test from 'tape';

import reducer from '../authToken';

test('reducers/authToken', (t) => {
  t.equal(
    reducer(undefined, {}),
    '',
    'initial state'
  );

  t.equal(
    reducer(undefined, { type: 'SET_AUTH_TOKEN', payload: '12345' }),
    '12345',
    'set state'
  );

  t.equal(
    reducer('12345', { type: 'SET_AUTH_TOKEN', payload: '67890' }),
    '67890',
    'change state'
  );

  t.equal(
    reducer('12345', { type: 'DO_NOT_SET_AUTH_TOKEN', payload: 'foobar' }),
    '12345',
    'non-actionable action type'
  );

  t.equal(
    reducer('12345', { type: 'SET_AUTH_TOKEN', payload: new Error('foobar'), error: true }),
    '12345',
    'ignore errors'
  );

  t.equal(
    reducer('12345', { type: 'LOGOUT' }),
    '',
    'logout'
  );

  t.end();
});
