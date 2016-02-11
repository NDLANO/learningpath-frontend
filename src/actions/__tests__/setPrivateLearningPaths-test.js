import test from 'tape';
import { isFSA } from 'flux-standard-action';
import actions from '..';


test('actions/setPrivateLearningPaths', (t) => {
  const actual = actions.setPrivateLearningPaths([
      { id: '12345' }, { id: '67890' }
  ]);

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_PRIVATE_LEARNING_PATHS');
  t.deepEqual(actual.payload, [{ id: '12345' }, { id: '67890' }]);
  t.notOk(actual.error);

  t.end();
});

test('actions/setPrivateLearningPaths with error', (t) => {
  const actual = actions.setPrivateLearningPaths(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_PRIVATE_LEARNING_PATHS');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
