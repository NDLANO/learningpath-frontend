import test from 'tape';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import actions from '..';

const middleware = [ thunk ];
const mockStore = configureMockStore(middleware);

test('actions/fetchPrivateLearningPath', t => {
  const authToken = '123345';
  const pathId = 123;

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/learningpaths/private/' + pathId)
    .reply(200, {id: pathId});

  const expectedActions = [
    actions.setPrivateLearningPath({id: pathId})
  ];

  const store = mockStore({ authToken }, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.end(res);

    nock.cleanAll();
  });

  store.dispatch( actions.fetchPrivateLearningPath( pathId ) );
});

test('actions/fetchPrivateLearningPath access denied', (t) => {
  const authToken = '123345';
  const pathId = 123;

  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .get('/learningpaths/private/' + pathId)
    .reply(403, {message: 'Invalid'});

  const expectedActions = [
    actions.applicationError(new Error('Invalid'))
  ];

  const store = mockStore({ authToken }, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.end(res);

    nock.cleanAll();
  });

  store.dispatch( actions.fetchPrivateLearningPath(pathId) );
});

