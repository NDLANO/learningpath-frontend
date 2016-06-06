import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { bindActionCreators } from 'redux';

import LearningPathSearch from './search/LearningPathSearch';
import CreateLearningPath from './new/CreateLearningPath';
import EditLearningPath from './edit/EditLearningPath';
import LearningPath from './LearningPath';
import LearningPathSummary from './sidebar/LearningPathSummary';
import LearningPathToCButtons from './sidebar/LearningPathToCButtons';
import actions from '../actions';
import { defaultSearchQuery, parseSearchQuery } from '../middleware/searchQuery';
import isEmpty from 'lodash/isEmpty';
import requireAuthentication from '../session/requireAuthentication';

import configureLearningPathStepRoutes from './step/routes';
const redirectToFirstStep = (store, fetchLearningPath) =>
  (nextState, replace, callback) => {
    const { params: { pathId } } = nextState;
    fetchLearningPath(pathId).then(() => {
      const stepId = store.getState().learningPath.learningsteps[0].id;
      replace({
        pathname: `/learningpaths/${pathId}/step/${stepId}`,
      });
      callback();
    })
    .catch(() => {
      replace({
        pathname: `/learningpaths/${pathId}`,
      });
      callback();
    });
  };

export default function (store, ifAuthenticated) {
  const {
    fetchLearningPaths,
    fetchLearningPath,
    createEmptyLearningPath,
    changeLearningPathQuery
  } = bindActionCreators(actions, store.dispatch);


  const learningPathStepRoutes = configureLearningPathStepRoutes(store, ifAuthenticated);
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
      <Route path="new" component={requireAuthentication(CreateLearningPath)} onEnter={ifAuthenticated(createEmptyLearningPath)} />
      <Route path=":pathId" component={LearningPath} >
        <IndexRoute components={{main: LearningPathSummary, saveButtons: LearningPathToCButtons}} />
        <Route path="first-step" component={requireAuthentication(EditLearningPath)} onEnter={redirectToFirstStep(store, fetchLearningPath)} />
        <Route path="edit" component={requireAuthentication(EditLearningPath)} onEnter={ifAuthenticated()} />
        {learningPathStepRoutes}
      </Route>
    </Route>
  );
}
