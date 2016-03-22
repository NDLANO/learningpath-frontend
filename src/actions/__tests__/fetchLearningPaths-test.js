import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import actions from '..';

const middleware = [ thunk ];
const mockStore = configureStore(middleware);

test('actions/fetchLearningPaths', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

  const apiMock = nock('http://ndla-api')
    .get('/learningpaths')
    .reply(200, {
      totalCount: 2,
      page: 3,
      pageSize: 25,
      results: [{id: '123'}, {id: '456'}]
    });

  const store = mockStore({});

  store.dispatch( actions.fetchLearningPaths() )
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.setLearningPathsTotalCount(2),
        actions.setLearningPaths([ {id: '123'}, {id: '456'} ]),
        actions.changeLearningPathQuery({page: 3, pageSize: 25})
      ]);

      t.doesNotThrow(() => apiMock.done());
      done();
    })
    .catch(done);
});

test('actions/fetchLearningPaths with query', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };


  const apiMock = nock('http://ndla-api')
    .get('/learningpaths')
    .query({query: 'foobar', page: 4, 'page-size': 15, sort: 'relevance'})
    .reply(200, {
      totalCount: 400,
      page: 4,
      pageSize: 15,
      results: [{id: '123'}, {id: '456'}]
    });

  const initialState = {
    learningPathQuery: {
      query: 'foobar',
      sort: 'relevance',
      page: 4,
      pageSize: 15 // OBS! not page-size
    }
  };

  const store = mockStore(initialState);

  store.dispatch( actions.fetchLearningPaths() )
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.setLearningPathsTotalCount(400),
        actions.setLearningPaths([ {id: '123'}, {id: '456'} ]),
        actions.changeLearningPathQuery({page: 4, pageSize: 15})
      ]);

      t.doesNotThrow(() => apiMock.done());
      t.equal(initialState.learningPathQuery.pageSize, 15, 'side effect 1');
      t.notOk(initialState.learningPathQuery['page-size'], 'side effect 2');

      done();
    })
    .catch(done);
});

test('actions/fetchLearningPaths with query without search term', t => {
  const done = res => {
    t.end(res);
    nock.cleanAll();
  };

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

  const initialState = {
    learningPathQuery: { sort, page, pageSize, query: '' }
  };

  const store = mockStore(initialState);

  store.dispatch( actions.fetchLearningPaths() )
    .then(() => {
      t.deepEqual(store.getActions(), [
        actions.setLearningPathsTotalCount(400),
        actions.setLearningPaths([ {id: '123'}, {id: '456'} ]),
        actions.changeLearningPathQuery({page, pageSize})
      ]);

      t.doesNotThrow(() => apiMock.done());
      t.equal(initialState.learningPathQuery.query, '', 'side effect');
      done();
    })
    .catch(done);
});
