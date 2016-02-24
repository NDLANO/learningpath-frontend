import test from 'tape';
import { isFSA } from 'flux-standard-action';
import actions from '..';


test('actions/setEditingLearningPath', (t) => {
  const actual = actions.setEditingLearningPath({ id: '12345' });

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_EDITING_LEARNING_PATH');
  t.ok(actual.payload);
  t.deepEqual(actual.payload, { id: '12345' });
  t.notOk(actual.error);

  t.end();
});

test('actions/setEditingLearningPath with error', (t) => {
  const actual = actions.setEditingLearningPath(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_EDITING_LEARNING_PATH');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});


