import test from 'tape';
import { isFSA } from 'flux-standard-action';
import actions from '..';


test('actions/setUserData', (t) => {
  const actual = actions.setUserData({
    name: 'Alice', email: 'alice@example.com'
  });

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_USER_DATA');
  t.ok(actual.payload);
  t.equal(actual.payload.name, 'Alice');
  t.equal(actual.payload.email, 'alice@example.com');
  t.notOk(actual.error);

  t.end();
});

test('actions/setUserData with error', (t) => {
  const actual = actions.setUserData(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_USER_DATA');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
