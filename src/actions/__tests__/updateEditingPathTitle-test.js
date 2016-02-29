import test from 'tape';
import { isFSA } from 'flux-standard-action';
import actions from '..';


test('actions/updateEditingPathTitle', t => {
  const actual = actions.updateEditingPathTitle({ title: 'whatever', language: 'eo' });

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'UPDATE_EDITING_LEARNING_PATH_TITLE');
  t.deepEqual(actual.payload, { title: 'whatever', language: 'eo' });
  t.notOk(actual.error);

  t.end();
});

test('actions/updateEditingPathTitle with error', t => {
  const actual = actions.updateEditingPathTitle(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'UPDATE_EDITING_LEARNING_PATH_TITLE');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
