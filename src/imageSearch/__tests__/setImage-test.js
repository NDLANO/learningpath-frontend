
import test from 'tape';
import { isFSA } from 'flux-standard-action';
import {setImage} from '../imageActions';


test('actions/setImage', (t) => {
  const actual = setImage(
    { id: '123345' }
  );

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_IMAGE');
  t.deepEqual(actual.payload,
    { id: '123345' }
  );
  t.notOk(actual.error);

  t.end();
});

test('actions/setImages with error', (t) => {
  const actual = setImage(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_IMAGE');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
