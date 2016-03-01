import test from 'tape';
import { isFSA } from 'flux-standard-action';
import actions from '..';


test('actions/setLearningPathsTotalCount', t => {
  const actual = actions.setLearningPathsTotalCount(123);

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_LEARNING_PATHS_TOTAL_COUNT');
  t.equal(actual.payload, 123);
  t.notOk(actual.error);

  t.end();
});

test('actions/setLearningPathsTotalCount with error', t => {
  const actual = actions.setLearningPathsTotalCount(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_LEARNING_PATHS_TOTAL_COUNT');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
