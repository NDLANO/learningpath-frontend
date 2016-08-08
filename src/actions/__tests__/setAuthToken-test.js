import test from 'tape';
import { isFSA } from 'flux-standard-action';
import { setAuthToken } from '..';


test('actions/setAuthToken', (t) => {
  const actual = setAuthToken('12345');

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_AUTH_TOKEN');
  t.equal(actual.payload, '12345');
  t.notOk(actual.error);

  t.end();
});

test('actions/setAuthToken with error', (t) => {
  const actual = setAuthToken(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_AUTH_TOKEN');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
