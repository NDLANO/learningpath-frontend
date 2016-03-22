import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import payload403invalid from './payload403invalid';

import actions from '..';

const middleware = [ thunk ];
const mockStore = configureStore(middleware);

const pathId = 123;

test('actions/fetchLearningPath', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api')
    .get('/learningpaths/' + pathId)
    .reply(200, {id: pathId});

  const store = mockStore({});

  store.dispatch( actions.fetchLearningPath( pathId ) )
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.setLearningPath({id: pathId})
      ]);

      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);

});

test('actions/fetchLearningPath access denied', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api')
    .get('/learningpaths/' + pathId)
    .reply(403, {message: 'Invalid'});

  const store = mockStore({});
  store.dispatch( actions.fetchLearningPath( pathId ) )
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.applicationError(payload403invalid())
      ]);

      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});
