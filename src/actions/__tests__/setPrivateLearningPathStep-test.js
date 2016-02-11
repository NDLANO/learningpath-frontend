import test from 'tape';
import { isFSA } from 'flux-standard-action';
import actions from '..';


test('actions/setPrivateLearningPathStep', (t) => {
  const actual = actions.setPrivateLearningPathStep({ id: '12345' });

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_PRIVATE_LEARNING_PATH_STEP');
  t.ok(actual.payload);
  t.deepEqual(actual.payload, { id: '12345' });
  t.notOk(actual.error);

  t.end();
});

test('actions/setPrivateLearningPathStep with error', (t) => {
  const actual = actions.setPrivateLearningPathStep(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_PRIVATE_LEARNING_PATH_STEP');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
