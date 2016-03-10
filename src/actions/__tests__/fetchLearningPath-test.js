import test from 'tape';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import payload403invalid from './payload403invalid';

import actions from '..';

const middleware = [ thunk ];
const mockStore = configureMockStore(middleware);

const pathId = 123;

test('actions/fetchLearningPath', t => {

  const apiMock = nock('http://ndla-api')
    .get('/learningpaths/' + pathId)
    .reply(200, {id: pathId});

  const expectedActions = [
    actions.setLearningPath({id: pathId})
  ];

  const store = mockStore({}, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.end(res);

    nock.cleanAll();
  });

  store.dispatch( actions.fetchLearningPath( pathId ) );
});

test('actions/fetchLearningPath access denied', t => {

  const apiMock = nock('http://ndla-api')
    .get('/learningpaths/' + pathId)
    .reply(403, {message: 'Invalid'});

  const expectedActions = [
    actions.applicationError(payload403invalid())
  ];

  const store = mockStore({}, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.end(res);

    nock.cleanAll();
  });

  store.dispatch( actions.fetchLearningPath( pathId ) );
});
