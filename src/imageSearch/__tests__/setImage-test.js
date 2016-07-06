
import test from 'tape';
import { isFSA } from 'flux-standard-action';
import { setSelectedImage, setSavedImage } from '../imageActions';


test('actions/setSelecteImage', (t) => {
  const actual = setSelectedImage(
    { id: '123345' }
  );

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_SELECTED_IMAGE');
  t.deepEqual(actual.payload,
    { id: '123345' }
  );
  t.notOk(actual.error);

  t.end();
});

test('actions/setSelecteImage with error', (t) => {
  const actual = setSelectedImage(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_SELECTED_IMAGE');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});


test('actions/setSavedImage', (t) => {
  const actual = setSavedImage(
    { id: '123345' }
  );

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_SAVED_IMAGE');
  t.deepEqual(actual.payload,
    { id: '123345' }
  );
  t.notOk(actual.error);

  t.end();
});

test('actions/setSavedImage with error', (t) => {
  const actual = setSavedImage(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_SAVED_IMAGE');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
