import test from 'tape';
import { isFSA } from 'flux-standard-action';
import actions from '..';


test('actions/updateLearningPathStep', t => {
  const actual = actions.updateLearningPathStep({ id: 123, seqNo: 4 });

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'UPDATE_LEARNING_PATH_STEP');
  t.deepEqual(actual.payload, { seqNo: 4, id: 123 });
  t.notOk(actual.error);

  t.end();
});

test('actions/updateLearningPathStep with error', t => {
  const actual = actions.updateLearningPathStep(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'UPDATE_LEARNING_PATH_STEP');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});


