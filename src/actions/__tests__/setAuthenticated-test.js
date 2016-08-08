import test from 'tape';
import { isFSA } from 'flux-standard-action';
import { setAuthenticated } from '..';


test('actions/setAuthenticated', (t) => {
  const actual = setAuthenticated(true);

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_AUTHENTICATED');
  t.equal(actual.payload, true);
  t.notOk(actual.error);

  t.end();
});

test('actions/setAuthenticated with error', (t) => {
  const actual = setAuthenticated(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_AUTHENTICATED');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
