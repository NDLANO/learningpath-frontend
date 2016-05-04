import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import actions from '..';

const middleware = [ thunk ];
const mockStore = configureStore(middleware);

const authToken = '123345';
const pathId = 123;
const stepId = 321;

const learningStepWithId = {
  id: stepId,
  title: [{language: 'nb', title: 'Goat1'}],
  seqNo: 2,
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
    .reply(200);
    
  const apiDeleteMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .delete('/learningpaths/' + pathId + '/learningsteps/' + stepId)
    .reply(204);


  const store = mockStore({ authToken });
  //console.log(store.dispatch(actions.deleteLearningPath(pathId, learningStepWithId) ) )

  store.dispatch( actions.deletePersistedLearningPathStep(pathId, learningStepWithId) )
    .then(() => {
      t.deepEqual(store.getActions(), [
        {type: 'SET_LEARNING_PATH', payload: {'seqNo': 0}}
      ]);

      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);

});
