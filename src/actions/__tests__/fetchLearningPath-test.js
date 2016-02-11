import test from 'tape';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import actions from '..';

test('actions/fetchLearningPaths', (t) => {
  const middleware = [ thunk ];
  const mockStore = configureMockStore(middleware);

  const apiMock = nock('http://ndla-api')
    .get('/learningpaths')
    .reply(200, {
      totalCount: 2,
      page: 3,
      pageSize: 25,
      results: [{id: '123'}, {id: '456'}]
    });

  const expectedActions = [
    actions.setLearningPaths([ {id: '123'}, {id: '456'} ]),
    actions.changeLearningPathQuery({page: 3, pageSize: 25})
  ];

  mockStore({}, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.end(res);

    nock.cleanAll();
  })
  .dispatch( actions.fetchLearningPaths() );
});

test('actions/fetchLearningPaths with query', (t) => {
  const middleware = [ thunk ];
  const mockStore = configureMockStore(middleware);

  const apiMock = nock('http://ndla-api')
    .get('/learningpaths')
    .query({query: 'foobar', page: 4, 'page-size': 15, sort: 'relevance'})
    .reply(200, {
      totalCount: 400,
      page: 4,
      pageSize: 15,
      results: [{id: '123'}, {id: '456'}]
    });

  const expectedActions = [
    actions.setLearningPaths([ {id: '123'}, {id: '456'} ]),
    actions.changeLearningPathQuery({page: 4, pageSize: 15})
  ];

  const initialState = {
    query: 'foobar',
    sort: 'relevance',
    page: 4,
    pageSize: 15 // OBS! not page-size
  };

  mockStore(initialState, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.equal(initialState.pageSize, 15, 'side effect 1');
    t.notOk(initialState['page-size'], 'side effect 2');
    t.end(res);

    nock.cleanAll();
  })
  .dispatch( actions.fetchLearningPaths() );
});
