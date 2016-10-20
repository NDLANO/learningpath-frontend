
import test from 'tape';
import { isFSA } from 'flux-standard-action';
import { setEmbedPreview, removeEmbedPreview } from '../embedSearchActions';

const oembed = {
  title: 'hei',
  url: 'test.no',
};
test('actions/setEmbedPreview', (t) => {
  const actual = setEmbedPreview(
    oembed
  );

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_EMBED_PREVIEW');
  t.deepEqual(actual.payload, oembed);
  t.notOk(actual.error);

  t.end();
});

test('actions/setEmbedPreview with error', (t) => {
  const actual = setEmbedPreview(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_EMBED_PREVIEW');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});

test('actions/removeEmbedPreview', (t) => {
  const actual = removeEmbedPreview({});

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'REMOVE_EMBED_PREVIEW');
  t.deepEqual(actual.payload, {});
  t.notOk(actual.error);

  t.end();
});

test('actions/removeEmbedPreview with error', (t) => {
  const actual = removeEmbedPreview(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'REMOVE_EMBED_PREVIEW');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
