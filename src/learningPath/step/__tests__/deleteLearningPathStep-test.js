import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import { deleteLearningPathStep } from '../learningPathStepActions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const authToken = '123345';
const pathId = 123;
const stepId = 321;

test('actions/deleteLearningPathStep with id', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  // GET /learningpaths/:pathId
  nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get(`/learningpaths/${pathId}`)
    .reply(200, {id: pathId});

  // DELETE /learningpaths/:pathId/learningsteps/:stepId
  nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .delete(`/learningpaths/${pathId}/learningsteps/${stepId}`)
    .reply(204);


  const store = mockStore({ authToken });

  store.dispatch(deleteLearningPathStep(pathId, stepId))
    .then(() => {
      t.deepEqual(store.getActions(), [
        {type: 'SET_LEARNING_PATH', payload: {id: pathId}}
      ]);

      t.doesNotThrow(() => nock.isDone());
      done();
    })
    .catch(done);
});
