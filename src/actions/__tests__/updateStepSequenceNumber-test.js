import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import payload403invalid from './payload403invalid';
import { routerActions } from 'react-router-redux';

import actions from '..';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const authToken = '123345';
const pathId = 123;
const steps = [
  { id: 10, seqNo: 0 },
  { id: 21, seqNo: 1 },
  { id: 13, seqNo: 2 }
];


test('actions/updateStepSequenceNumber sucessfully', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  // updateSeqNo
  nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .put(`/learningpaths/${pathId}/seqNo`, steps)
    .reply(200, steps);
  // fetchLearningPath
  nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get(`/learningpaths/${pathId}`)
    .reply(200, {id: pathId});

  const store = mockStore({ authToken });

  store.dispatch(actions.updateStepSequenceNumber(pathId, steps))
    .then(() => {
      t.deepEqual(store.getActions(), [
        routerActions.push(`/learningpaths/${pathId}`)
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

  // updateSeqNo
  nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .put(`/learningpaths/${pathId}/seqNo`, steps)
    .reply(403, {message: 'Invalid'});

  // fetchLearningPath
  nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get(`/learningpaths/${pathId}`)
    .reply(200, {id: pathId});

  const store = mockStore({ authToken });

  store.dispatch(actions.updateStepSequenceNumber(pathId, steps))
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.applicationError(payload403invalid())
      ]);
      t.doesNotThrow(() => nock.isDone());

      done();
    })
    .catch(done);
});
