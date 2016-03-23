import test from 'tape';
import { isFSA } from 'flux-standard-action';
import actions from '..';


test('actions/updateLearningPathDescription', t => {
  const actual = actions.updateLearningPathDescription({ description: 'whatever', language: 'eo' });

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'UPDATE_LEARNING_PATH_DESCRIPTION');
  t.deepEqual(actual.payload, { description: 'whatever', language: 'eo' });
  t.notOk(actual.error);

  t.end();
});

test('actions/updateLearningPathDescription with error', t => {
  const actual = actions.updateLearningPathDescription(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'UPDATE_LEARNING_PATH_DESCRIPTION');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
