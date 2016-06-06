import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { bindActionCreators } from 'redux';

import LearningPathSearch from './search/LearningPathSearch';
import CreateLearningPath from './new/CreateLearningPath';
import EditLearningPath from './edit/EditLearningPath';
import actions from '../actions';
import { defaultSearchQuery, parseSearchQuery } from '../middleware/searchQuery';
import isEmpty from 'lodash/isEmpty';
import requireAuthentication from '../components/requireAuthentication';
import {
  LearningPath, LearningPathSummary, LearningPathStep,
  EditLearningPathStep, CreateLearningPathStep,
  LearningPathToCButtons,
  SortLearningSteps
} from '../components';

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
    fetchLearningPathStep,
    createEmptyLearningPathStep,
    createEmptyLearningPath,
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
      <Route path="new" component={requireAuthentication(CreateLearningPath)} onEnter={ifAuthenticated(createEmptyLearningPath)} />
      <Route path=":pathId" component={LearningPath} >
        <IndexRoute components={{main: LearningPathSummary, saveButtons: LearningPathToCButtons}} />
        <Route path="first-step" component={requireAuthentication(EditLearningPath)} onEnter={redirectToFirstStep(store, fetchLearningPath)} />
        <Route path="edit" component={requireAuthentication(EditLearningPath)} onEnter={ifAuthenticated()} />

        <Route path="step/new" component={requireAuthentication(CreateLearningPathStep)} onEnter={ifAuthenticated(createEmptyLearningPathStep)} />
        <Route path="sort" components={{main: LearningPathSummary, sortLearningSteps: SortLearningSteps}} onEnter={ifAuthenticated()} />
        <Route path="step/:stepId/edit" component={requireAuthentication(EditLearningPathStep)} onEnter={ifAuthenticated(({params}) => fetchLearningPathStep(params.pathId, params.stepId))} />
        <Route
          path="step/:stepId" components={{main: LearningPathStep, saveButtons: LearningPathToCButtons}}
          onEnter={({params}) => fetchLearningPathStep(params.pathId, params.stepId)}
        />
      </Route>
    </Route>
  );
}
