
import test from 'tape';
import { isFSA } from 'flux-standard-action';
import { setEmbedResults } from '../embedSearchActions';

const results = {
  queries: {
    request: [
      { totalResults: 20 },
    ],
    items: [
      { title: 'hei' },
    ],
  },
};
test('actions/setEmbedResults', (t) => {
  const actual = setEmbedResults(
    results
  );

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_EMBED_RESULTS');
  t.deepEqual(actual.payload, results);
  t.notOk(actual.error);

  t.end();
});

test('actions/setEmbedResults with error', (t) => {
  const actual = setEmbedResults(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_EMBED_RESULTS');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
