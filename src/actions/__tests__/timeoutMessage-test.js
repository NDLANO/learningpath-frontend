import test from 'tape';
import { isFSA } from 'flux-standard-action';
import actions from '..';

test('actions/timeoutMessage', (t) => {
  const message = {
    id: 123,
    message: 'All went well',
    severity: 'success',
    timeToLive: 500
  };

  actions.timeoutMessage(message)(actual => {
    t.ok(isFSA(actual), 'FSA compliant action');
    t.deepEqual(actual, actions.clearMessage(message.id));
    t.end();
  });
});
