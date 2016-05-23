import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import actions from '..';
import { routerActions } from 'react-router-redux';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const authToken = '123345';
const pathId = 123;

const learningStep = {
  title: [{language: 'nb', title: 'Goat1'}],
  seqNo: 0,
  description: [{language: 'nb', description: 'this is a description1'}],
  embedContent: [{language: 'nb', url: 'https://www.youtube.com/watch?v=ggB33d0BLcY'}]
};

test('actions/deleteUnPersistedLearningPathStep without id', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };


  const store = mockStore({ authToken });

  store.dispatch(actions.deleteUnPersistedLearningPathStep(pathId, learningStep));

  t.deepEqual(store.getActions(), [
    {type: 'REMOVE_LEARNING_PATH_STEP', payload: learningStep},
    routerActions.push({ pathname: `/learningpaths/${pathId}` })
  ]);

  done();
});
