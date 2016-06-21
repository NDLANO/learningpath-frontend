import test from 'tape';
import { isFSA } from 'flux-standard-action';

import { setLearningPath } from '../learningPathActions';


test('actions/setLearningPath', t => {
  const actual = setLearningPath({ id: '12345' });

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_LEARNING_PATH');
  t.ok(actual.payload);
  t.deepEqual(actual.payload, { id: '12345' });
  t.notOk(actual.error);

  t.end();
});

test('actions/setLearningPath with error', t => {
  const actual = setLearningPath(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'SET_LEARNING_PATH');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
