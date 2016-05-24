import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import payload403invalid from './payload403invalid';

import actions from '..';
import { routerActions } from 'react-router-redux';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const authToken = '123345';
const pathId = 123;

test('actions/updateLearningPath', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const putPathApi = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .put('/learningpaths/' + pathId, {
      id: pathId, isRequest: true
    })
    .reply(200, {id: pathId, isResponse: true});

  const store = mockStore({ authToken });

  store.dispatch(actions.updateLearningPath(pathId, {
    id: pathId, isRequest: true
  }))
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.addMessage({message: 'Lagret OK'}),
        actions.setLearningPath({
          id: pathId,
          isResponse: true
        }),
        routerActions.push({ pathname: `/learningpaths/${pathId}` })
      ]);

      t.doesNotThrow(() => putPathApi.done());

      done();
    })
    .catch(done);
});

test('actions/updateLearningPath with redirect', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const putPathApi = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .put('/learningpaths/' + pathId, { id: pathId })
    .reply(200, {id: pathId});

  const store = mockStore({ authToken });

  store.dispatch(actions.updateLearningPath(pathId, {id: pathId}, '/goto/dev/null'))
    .then(() => {
      const actual = store.getActions();

      t.equal(actual.length, 3, 'three actions');
      t.deepEqual(actual[2], routerActions.push({ pathname: '/goto/dev/null' }));

      t.doesNotThrow(() => putPathApi.done());

      done();
    })
    .catch(done);
});

test('actions/updateLearningPath access denied', (t) => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .put('/learningpaths/' + pathId, {
      id: pathId,
      foo: 'bar'
    })
    .reply(403, {message: 'Invalid'});

  const store = mockStore({ authToken });

  store.dispatch(actions.updateLearningPath(pathId, { id: pathId, foo: 'bar' }))
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.applicationError(payload403invalid())
      ]);
      t.doesNotThrow(() => apiMock.done());

      done();
    })
    .catch(done);
});
