import test from 'tape';
import { isFSA } from 'flux-standard-action';
import actions from '..';


test('actions/createLearningPathStep', (t) => {
  const actual = actions.createLearningPathStep({ id: '12345' });

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'CREATE_LEARNING_PATH_STEP');
  t.notOk(actual.error);

  t.end();
});

test('actions/createLearningPathStep with error', (t) => {
  const actual = actions.createLearningPathStep(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'CREATE_LEARNING_PATH_STEP');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});


