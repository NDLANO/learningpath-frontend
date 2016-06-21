import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import payload403invalid from '../../actions/__tests__/payload403invalid';

import { applicationError, addMessage } from '../../actions';
import { createLearningPath, setLearningPath } from '../learningPathActions';
import { createEmptyLearningPathStep } from '../step/learningPathStepActions';
import { routerActions } from 'react-router-redux';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const authToken = '123345';
const pathId = 123;

test('actions/createLearningPath', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const learningsteps = [
    { seqNo: 1 },
    { seqNo: 0 },
    { seqNo: 2 }
  ];

  const postPathApi = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .post('/learningpaths', { isRequest: true, learningsteps })
    .reply(200, {id: pathId, isResponse: true});

  const postStep1Api = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .post(`/learningpaths/${pathId}/learningsteps`, { seqNo: 0 })
    .reply(200, {id: 12, seqNo: 0, isResponse: true});

  const postStep2Api = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .post(`/learningpaths/${pathId}/learningsteps`, { seqNo: 1 })
    .reply(200, {id: 34, seqNo: 1, isResponse: true});

  const postStep3Api = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .post(`/learningpaths/${pathId}/learningsteps`, { seqNo: 2 })
    .reply(200, {id: 56, seqNo: 2, isResponse: true});

  const store = mockStore({ authToken });


  store.dispatch(
    createLearningPath({ isRequest: true, learningsteps })
  )
    .then(() => {
      t.deepEqual(store.getActions(), [
        addMessage({message: 'Lagret OK'}),
        setLearningPath({
          id: pathId,
          isResponse: true,
          learningsteps: [
            {id: 12, seqNo: 0, isResponse: true},
            {id: 34, seqNo: 1, isResponse: true},
            {id: 56, seqNo: 2, isResponse: true}
          ]
        }),
        createEmptyLearningPathStep(),
        routerActions.push({ pathname: `/learningpaths/${pathId}/step/new` })
      ]);

      t.doesNotThrow(() => postPathApi.done());
      t.doesNotThrow(() => postStep1Api.done());
      t.doesNotThrow(() => postStep2Api.done());
      t.doesNotThrow(() => postStep3Api.done());

      done();
    })
    .catch(done);
});

test('actions/createLearningPath access denied', (t) => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .post('/learningpaths', {
      foo: 'bar'
    })
    .reply(403, {message: 'Invalid'});

  const store = mockStore({ authToken });

  store.dispatch(createLearningPath({ foo: 'bar' }))
    .then(() => {
      t.deepEqual(store.getActions(), [
        applicationError(payload403invalid())
      ]);
      t.doesNotThrow(() => apiMock.done());

      done();
    })
    .catch(done);
});
