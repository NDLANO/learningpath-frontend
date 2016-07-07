import test from 'tape';
import { isFSA } from 'flux-standard-action';
import { clearMessage, timeoutMessage } from '../messagesActions';

test('actions/timeoutMessage', (t) => {
  const message = {
    id: 123,
    message: 'All went well',
    severity: 'success',
    timeToLive: 500,
  };

  timeoutMessage(message)(actual => {
    t.ok(isFSA(actual), 'FSA compliant action');
    t.deepEqual(actual, clearMessage(message.id));
    t.end();
  });
});
