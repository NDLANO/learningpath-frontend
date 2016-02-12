import test from 'tape';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import actions from '..';

const createMockStore = () => configureMockStore([thunk]);

test('actions/fetchLearningPaths', t => {
  const mockStore = createMockStore();

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

test('actions/fetchLearningPaths with query', t => {
  const mockStore = createMockStore();

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
    learningPathQuery: {
      query: 'foobar',
      sort: 'relevance',
      page: 4,
      pageSize: 15 // OBS! not page-size
    }
  };

  mockStore(initialState, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.equal(initialState.learningPathQuery.pageSize, 15, 'side effect 1');
    t.notOk(initialState.learningPathQuery['page-size'], 'side effect 2');
    t.end(res);

    nock.cleanAll();
  })
  .dispatch( actions.fetchLearningPaths() );
});

test('actions/fetchLearningPaths with empty query', t => {
  const mockStore = createMockStore();

  const page = 3;
  const pageSize = 10;
  const sort = 'relevance';

  const apiMock = nock('http://ndla-api')
    .get('/learningpaths')
    .query({page, sort, 'page-size': pageSize /* OBS! no query */})
    .reply(200, {
      page, pageSize, totalCount: 400,
      results: [{id: '123'}, {id: '456'}]
    });

  const expectedActions = [
    actions.setLearningPaths([ {id: '123'}, {id: '456'} ]),
    actions.changeLearningPathQuery({page, pageSize})
  ];

  const initialState = {
    learningPathQuery: { sort, page, pageSize, query: '' }
  };

  mockStore(initialState, expectedActions, (res) => {
    t.doesNotThrow(() => apiMock.done());
    t.equal(initialState.learningPathQuery.query, '', 'side effect');
    t.end(res);

    nock.cleanAll();
  })
  .dispatch( actions.fetchLearningPaths() );
});
