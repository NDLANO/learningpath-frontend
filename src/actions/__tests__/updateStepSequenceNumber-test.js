import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import payload403invalid from './payload403invalid';
import { isFSA } from 'flux-standard-action';

import actions from '..';
import { routerActions } from 'react-router-redux';

const middleware = [ thunk ];
const mockStore = configureStore(middleware);

const authToken = '123345';
const pathId = 123;
const stepId = 321;
const seqNo = 3;


/*test('actions/updateStepSequenceNumber', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const body = {
    seqNo: 2
  };



  const learningStepReply = Object.assign({}, body, {});

  console.log('LGLLLGLGLGLGLLGLGLGLGLLGLGLGLGLLGLGLGLLGLGLG');
  const updateSeqNo = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .put('/learningpaths/' + pathId + '/learningsteps/' + stepId + '/seqNo/', seqNo)
    .reply(200, learningStepReply);
  console.log(updateSeqNo);
  console.log('LGLLLGeeeeeeeeeeeeeeLGLGLGLLGLGLGLGLLGLGLGLGLLGLGLGLLGLGLG');

  const store = mockStore({ authToken });

  store.dispatch( actions.updateStepSequenceNumber(pathId, stepId, seqNo) )
    .then(() => {
      console.log(store.getActions());
      t.deepEqual(store.getActions(), [
        actions.updateLearningPathStepSeqNo(seqNo)
      ]);

      t.doesNotThrow(() => updateSeqNo.done());

      done();
    })
    .catch(done);
});*/

/*test('actions/updateStepSequenceNumber access denied', (t) => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const learningStep = {
    title: [{language: 'nb', title: 'Goat'}],
    description: [{language: 'nb', description: 'this is a description'}],
    embedContent: [{language: 'nb', url: 'https://www.youtube.com/watch?v=ggB33d0BLcY'}]
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .put('/learningpaths/' + pathId + '/learningsteps/' + stepId, learningStep)
    .reply(403, {message: 'Invalid'});

  const store = mockStore({ authToken });

  store.dispatch( actions.updateLearningPathStep(pathId, stepId, learningStep) )
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.applicationError(payload403invalid())
      ]);
      t.doesNotThrow(() => apiMock.done());

      done();
    })
    .catch(done);
});
*/
test('actions/sortSteps', t => {
  const actual = actions.updateLearningPathStepSeqNo({ title: 'whatever', language: 'eo' });

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'UPDATE_LEARNING_PATH_STEP_SEQ_NO');
  t.deepEqual(actual.payload, { title: 'whatever', language: 'eo' });
  t.notOk(actual.error);

  t.end();
});

test('actions/sortSteps with error', t => {
  const actual = actions.updateLearningPathStepSeqNo(new Error('fail!'));

  t.ok(isFSA(actual), 'FSA compliant action');

  t.equal(actual.type, 'UPDATE_LEARNING_PATH_STEP_SEQ_NO');
  t.equal(actual.payload.message, 'fail!');
  t.ok(actual.error);

  t.end();
});
