/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { bindActionCreators } from 'redux';

import LearningPathSearch from './search/LearningPathSearch';
import CreateLearningPath from './new/CreateLearningPath';
import EditLearningPath from './edit/EditLearningPath';
import LearningPath from './LearningPath';
import LearningPathSummary from './sidebar/LearningPathSummary';
import LearningPathToCButtons from './sidebar/LearningPathToCButtons';
import AddLearningPathStepButton from './sidebar/AddLearningPathStepButton';
import * as learningPathActions from './learningPathActions';
import { fetchLearningPaths } from '../actions';

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
    fetchLearningPath,
    createEmptyLearningPath,
  } = bindActionCreators(learningPathActions, store.dispatch);

  const learningPathStepRoutes = configureLearningPathStepRoutes(store, ifAuthenticated);
  return (
    <Route path="learningpaths(/)">
      <IndexRoute
        component={LearningPathSearch}
        onEnter={(nextState) => store.dispatch(fetchLearningPaths(nextState.location.query))}
        onChange={(prevState, nextState) => store.dispatch(fetchLearningPaths(nextState.location.query))}
      />
      <Route path="new" component={requireAuthentication(CreateLearningPath)} onEnter={ifAuthenticated(createEmptyLearningPath)} />
      <Route path=":pathId" component={LearningPath} >
        <IndexRoute components={{ main: LearningPathSummary, addStepButton: AddLearningPathStepButton, saveButtons: LearningPathToCButtons }} />
        <Route path="first-step" component={requireAuthentication(EditLearningPath)} onEnter={redirectToFirstStep(store, fetchLearningPath)} />
        <Route path="edit" component={requireAuthentication(EditLearningPath)} onEnter={ifAuthenticated()} />
        {learningPathStepRoutes}
      </Route>
    </Route>
  );
}
