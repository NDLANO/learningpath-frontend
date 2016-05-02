import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import payload403invalid from './payload403invalid';
import { isFSA } from 'flux-standard-action';

import actions from '..';

const middleware = [ thunk ];
const mockStore = configureStore(middleware);

const authToken = '123345';
const pathId = 123;
const stepId = 321;
const seqNo = 3;


test('actions/updateStepSequenceNumber sucessfully', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const body = {
    seqNo: 3
  };



  const learningStepReply = Object.assign({}, body, {});


  const updateSeqNo = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .put('/learningpaths/' + pathId + '/learningsteps/' + stepId + '/seqNo', body)
    .reply(200, learningStepReply);
  const fetchLearningPath = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/learningpaths/' + pathId)
    .reply(200, {id: pathId});

  const store = mockStore({ authToken });

  store.dispatch( actions.updateStepSequenceNumber(pathId, stepId, seqNo) )
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.setLearningPath({id: pathId})
      ]);
      t.doesNotThrow(() => nock.isDone());

      done();
    })
    .catch(done);
});

test('actions/updateStepSequenceNumber access denied', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const body = {
    seqNo: 3
  };

  const updateSeqNo = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .put('/learningpaths/' + pathId + '/learningsteps/' + stepId + '/seqNo', body)
    .reply(403, {message: 'Invalid'});

  const fetchLearningPath = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/learningpaths/' + pathId)
    .reply(200, {id: pathId});

  const store = mockStore({ authToken });

  store.dispatch( actions.updateStepSequenceNumber(pathId, stepId, seqNo) )
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.applicationError(payload403invalid())
      ]);
      t.doesNotThrow(() => nock.isDone());

      done();
    })
    .catch(done);
});
