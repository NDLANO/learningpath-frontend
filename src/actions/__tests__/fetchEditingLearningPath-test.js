import test from 'tape';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import payload403invalid from './payload403invalid';

import actions from '..';

const middleware = [ thunk ];
const mockStore = configureMockStore(middleware);

test('actions/fetchEditingLearningPath', t => {
  const authToken = '123345';
  const pathId = 123;

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/learningpaths/private/' + pathId)
    .reply(200, {id: pathId});

  const expectedActions = [
    actions.setEditingLearningPath({id: pathId})
  ];

  const store = mockStore({ authToken }, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.end(res);

    nock.cleanAll();
  });

  store.dispatch( actions.fetchEditingLearningPath( pathId ) );
});

test('actions/fetchEditingLearningPath access denied', (t) => {
  const authToken = '123345';
  const pathId = 123;

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/learningpaths/private/' + pathId)
    .reply(403, {message: 'Invalid'});

  const expectedActions = [
    actions.applicationError(payload403invalid())
  ];

  const store = mockStore({ authToken }, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.end(res);

    nock.cleanAll();
  });

  store.dispatch( actions.fetchEditingLearningPath(pathId) );
});


