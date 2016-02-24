import test from 'tape';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import actions from '..';

const middleware = [ thunk ];
const mockStore = configureMockStore(middleware);

const authToken = '123345';
const pathId = 123;

test('actions/updateEditingLearningPath', t => {
  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .put('/learningpaths/private/' + pathId, {
      id: pathId, isRequest: true
    })
    .reply(200, {id: pathId, isResponse: true});

  const expectedActions = [
    actions.setEditingLearningPath({id: pathId, isResponse: true})
  ];

  const store = mockStore({ authToken }, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.end(res);

    nock.cleanAll();
  });

  store.dispatch( actions.updateEditingLearningPath(pathId, { id: pathId, isRequest: true }) );
});

test('actions/updateEditingLearningPath access denied', (t) => {
  const apiMock = nock('http://ndla-api', { reqheaders: { 'app-key': authToken } })
    .put('/learningpaths/private/' + pathId, {
      id: pathId,
      foo: 'bar'
    })
    .reply(403, {message: 'Invalid'});

  const expectedActions = [
    actions.applicationError(new Error('Invalid'))
  ];

  const store = mockStore({ authToken }, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.end(res);

    nock.cleanAll();
  });

  store.dispatch( actions.updateEditingLearningPath(pathId, { id: pathId, foo: 'bar' }) );
});
