import test from 'tape';
import { isFSA } from 'flux-standard-action';
import actions from '..';


test('actions/changeLearningPathQuery', (t) => {
  const actual = actions.changeLearningPathQuery({
    query: 'foo',
    page: 2,
    sort: 'relevance'
  });

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'CHANGE_LEARNING_PATH_QUERY');
  t.deepEqual(actual.payload, {
    query: 'foo',
    page: 2,
    sort: 'relevance'
  });
  t.notOk(actual.error);

  t.end();
});

test('actions/changeLearningPathQuery with error', (t) => {
  const actual = actions.changeLearningPathQuery(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'CHANGE_LEARNING_PATH_QUERY');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});

