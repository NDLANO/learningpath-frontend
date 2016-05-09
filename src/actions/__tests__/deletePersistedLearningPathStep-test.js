import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import actions from '..';
import { routerActions } from 'react-router-redux';

const middleware = [ thunk ];
const mockStore = configureStore(middleware);

const authToken = '123345';
const pathId = 123;
const stepId = 321;

const learningStep = {
  id: stepId,
  title: [{language: 'nb', title: 'Goat1'}],
  seqNo: 0,
  description: [{language: 'nb', description: 'this is a description1'}],
  embedContent: [{language: 'nb', url: 'https://www.youtube.com/watch?v=ggB33d0BLcY'}]
};

test('actions/deletePersistedLearningPathStep with id', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };
  const apiGetMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/learningpaths/' + pathId)
    .reply(200, {id: pathId});

  const apiDeleteMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .delete('/learningpaths/' + pathId + '/learningsteps/' + stepId)
    .reply(204);


  const store = mockStore({ authToken });

  store.dispatch( actions.deletePersistedLearningPathStep(pathId, learningStep) )
    .then(() => {
      t.deepEqual(store.getActions(), [
        {type: 'SET_LEARNING_PATH', payload: {id: pathId}},
        routerActions.push({ pathname: `/learningpaths/${pathId}` })
      ]);

      t.doesNotThrow(() => nock.isDone());
      done();
    })
    .catch(done);
});
