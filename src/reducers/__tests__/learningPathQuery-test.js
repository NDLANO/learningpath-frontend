import test from 'tape';

import reducer from '../learningPathQuery';

test('reducers/learningPathQuery', (t) => {
  t.deepEqual(
    reducer(undefined, {}),
    {},
    'initial state'
  );

  t.deepEqual(
    reducer(undefined, {type: 'CHANGE_LEARNING_PATH_QUERY', payload: {
      query: 'foo', page: 2, sort: 'relevance' }}),
    { query: 'foo', page: 2, sort: 'relevance' },
    'set state'
  );

  t.deepEqual(
    reducer({ query: 'foo', page: 2, sort: 'relevance' },
      {type: 'CHANGE_LEARNING_PATH_QUERY', payload: { sort: '-lastUpdated' }}),
    { query: 'foo', page: 2, sort: '-lastUpdated' },
    'change state'
  );

  t.deepEqual(
    reducer({ query: 'foo', page: 2, sort: 'relevance' },
      {type: 'DO_NOT_CHANGE_LEARNING_PATH_QUERY', payload: { sort: 'lastUpdated' }}),
    { query: 'foo', page: 2, sort: 'relevance' },
    'non-actionable action type'
  );

  t.deepEqual(
    reducer({ query: 'foo', page: 2, sort: 'relevance' },
      {type: 'CHANGE_LEARNING_PATH_QUERY', payload: new Error('foobar'), error: true }),
    { query: 'foo', page: 2, sort: 'relevance' },
    'ignore errors'
  );

  t.end();
});
