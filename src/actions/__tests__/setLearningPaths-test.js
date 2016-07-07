import test from 'tape';
import { isFSA } from 'flux-standard-action';
import actions from '..';


test('actions/setLearningPaths', (t) => {
  const actual = actions.setLearningPaths([
      { id: '12345' }, { id: '67890' },
  ]);

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_LEARNING_PATHS');
  t.deepEqual(actual.payload, [{ id: '12345' }, { id: '67890' }]);
  t.notOk(actual.error);

  t.end();
});

test('actions/setLearningPaths with error', (t) => {
  const actual = actions.setLearningPaths(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_LEARNING_PATHS');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
