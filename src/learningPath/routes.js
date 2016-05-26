import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { bindActionCreators } from 'redux';

import LearningPathSearch from './search/LearningPathSearch';
import actions from '../actions';
import { defaultSearchQuery, parseSearchQuery } from '../middleware/searchQuery';
import isEmpty from 'lodash/isEmpty';

export default function (store) {
  const {
    fetchLearningPaths,
    changeLearningPathQuery
  } = bindActionCreators(actions, store.dispatch);

  return (
    <Route path="learningpaths(/)">
      <IndexRoute
        component={LearningPathSearch} onEnter={ctx => {
          let query = parseSearchQuery(ctx.location.query);
          if (isEmpty(query)) {
            query = defaultSearchQuery;
          }

          changeLearningPathQuery(query);
          fetchLearningPaths();
        }}
      />
    </Route>
  );
}
