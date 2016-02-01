import test from 'tape';
import { isFSA } from 'flux-standard-action';
import actions from '..';


test('actions/sortPrivateLearningPaths', (t) => {
  const actual = actions.sortPrivateLearningPaths('lastUpdated');

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SORT_PRIVATE_LEARNING_PATHS');
  t.equal(actual.payload, 'lastUpdated');
  t.notOk(actual.error);

  t.end();
});

test('actions/sortPrivateLearningPaths with error', (t) => {
  const actual = actions.sortPrivateLearningPaths(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SORT_PRIVATE_LEARNING_PATHS');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});

