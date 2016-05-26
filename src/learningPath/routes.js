import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { bindActionCreators } from 'redux';

import LearningPathSearch from './search/LearningPathSearch';
import CreateLearningPath from './new/CreateLearningPath';
import actions from '../actions';
import { defaultSearchQuery, parseSearchQuery } from '../middleware/searchQuery';
import isEmpty from 'lodash/isEmpty';
import requireAuthentication from '../components/requireAuthentication';
import {
  LearningPath, LearningPathSummary, LearningPathStep,
  EditLearningPath, EditLearningPathStep, CreateLearningPathStep,
  LearningPathToCButtons,
  SortLearningSteps
} from '../components';

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
      <Route path=":pathId" onEnter={({params}) => fetchLearningPath(params.pathId)} component={LearningPath} >
        <IndexRoute components={{main: LearningPathSummary, saveButtons: LearningPathToCButtons}} />
        <Route path="edit" component={requireAuthentication(EditLearningPath)} onEnter={ifAuthenticated(({params}) => fetchLearningPath(params.pathId))} />

        <Route path="step/new" component={requireAuthentication(CreateLearningPathStep)} onEnter={ifAuthenticated(createEmptyLearningPathStep)} />

        <Route path="sort" components={{main: LearningPathSummary, sortLearningSteps: SortLearningSteps}} onEnter={ifAuthenticated(({params}) => fetchLearningPath(params.pathId))} />

        <Route path="step/:stepId/edit" component={requireAuthentication(EditLearningPathStep)} onEnter={ifAuthenticated(({params}) => fetchLearningPathStep(params.pathId, params.stepId))} />
        <Route
          path="step/:stepId" components={{main: LearningPathStep, saveButtons: LearningPathToCButtons}}
          onEnter={({params}) => fetchLearningPathStep(params.pathId, params.stepId)}
        />
      </Route>
    </Route>
  );
}
