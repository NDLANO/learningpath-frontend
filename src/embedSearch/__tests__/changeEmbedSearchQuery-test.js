import test from 'tape';
import { isFSA } from 'flux-standard-action';
import { changeEmbedSearchQuery } from '../embedSearchActions';

const query = {
  textQuery: 'hei',
  page: 1,
  start: 1,
  filter: '',
};

test('actions/changeEmbedSearchQuery', (t) => {
  const actual = changeEmbedSearchQuery(
    query
  );

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'CHANGE_EMBED_SEARCH_QUERY');
  t.deepEqual(actual.payload, query);
  t.notOk(actual.error);

  t.end();
});

test('actions/changeEmbedSearchQuery with error', (t) => {
  const actual = changeEmbedSearchQuery(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'CHANGE_EMBED_SEARCH_QUERY');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
