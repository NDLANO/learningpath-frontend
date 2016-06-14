import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import payload403invalid from '../../../actions/__tests__/payload403invalid';

import { applicationError, addMessage } from '../../../actions';
import { setLearningPathStep, updateLearningPathStep } from '../learningPathStepActions';
import { routerActions } from 'react-router-redux';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const authToken = '123345';
const pathId = 123;
const stepId = 321;


test('actions/updateLearningPathStep', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const learningStep = {
    title: [{language: 'nb', title: 'Goat'}],
    description: [{language: 'nb', description: 'this is a description'}],
    embedContent: [{language: 'nb', url: 'https://www.youtube.com/watch?v=ggB33d0BLcY'}]
  };

  const learningStepReply = Object.assign({}, learningStep, {id: stepId});

  const postPathStepApi = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .put(`/learningpaths/${pathId}/learningsteps/${stepId}`, learningStep)
    .reply(200, learningStepReply);

  const store = mockStore({ authToken });

  store.dispatch(updateLearningPathStep(pathId, stepId, learningStep))
    .then(() => {
      t.deepEqual(store.getActions(), [
        addMessage({message: 'Lagret OK'}),
        setLearningPathStep(learningStepReply),
        routerActions.push({ pathname: `/learningpaths/${pathId}/step/${stepId}` })
      ]);

      t.doesNotThrow(() => postPathStepApi.done());

      done();
    })
    .catch(done);
});

test('actions/updateLearningPathStep access denied', (t) => {
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
    .put(`/learningpaths/${pathId}/learningsteps/${stepId}`, learningStep)
    .reply(403, {message: 'Invalid'});

  const store = mockStore({ authToken });

  store.dispatch(updateLearningPathStep(pathId, stepId, learningStep))
    .then(() => {
      t.deepEqual(store.getActions(), [
        applicationError(payload403invalid())
      ]);
      t.doesNotThrow(() => apiMock.done());

      done();
    })
    .catch(done);
});
