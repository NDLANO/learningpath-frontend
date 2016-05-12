import test from 'tape';
import { isFSA } from 'flux-standard-action';
import actions from '..';

test('actions/setMyLearningPathsSortOrder', t => {
  const actual = actions.setMyLearningPathsSortOrder('lastUpdated');

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_MY_LEARNING_PATHS_SORT_ORDER');
  t.equal(actual.payload, 'lastUpdated');
  t.notOk(actual.error);

  t.end();
});

test('actions/setMyLearningPathsSortOrder with error', t => {
  const actual = actions.setMyLearningPathsSortOrder(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_MY_LEARNING_PATHS_SORT_ORDER');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});