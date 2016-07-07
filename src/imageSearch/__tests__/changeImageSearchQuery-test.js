import test from 'tape';
import { isFSA } from 'flux-standard-action';
import { changeImageSearchQuery } from '../imageActions';


test('actions/changeImageSearchQuery', (t) => {
  const actual = changeImageSearchQuery({ query: 'test', 'page-size': 16, page: 1 });

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'CHANGE_IMAGE_SEARCH_QUERY');
  t.deepEqual(actual.payload, { query: 'test', 'page-size': 16, page: 1 });
  t.notOk(actual.error);

  t.end();
});

test('actions/changeImageSearchQuery with error', (t) => {
  const actual = changeImageSearchQuery(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'CHANGE_IMAGE_SEARCH_QUERY');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
