
import React from 'react';
import { Route } from 'react-router';
import { bindActionCreators } from 'redux';

import * as actions from './learningPathStepActions';
import requireAuthentication from '../../session/requireAuthentication';
import LearningPathSummary from '../sidebar/LearningPathSummary';
import LearningPathToCButtons from '../sidebar/LearningPathToCButtons';
import LearningPathStep from './LearningPathStep';
import CreateLearningPathStep from './create/CreateLearningPathStep';
import EditLearningPathStep from './edit/EditLearningPathStep';
import SortLearningPathSteps from './sort/SortLearningPathSteps';
import AddLearningPathStepButton from '../sidebar/AddLearningPathStepButton';

export default function (store, ifAuthenticated) {
  const {
    fetchLearningPathStep,
    createEmptyLearningPathStep,
  } = bindActionCreators(actions, store.dispatch);

  return (
    <Route path="step(/)">
      <Route path="new(/)" component={requireAuthentication(CreateLearningPathStep)} onEnter={ifAuthenticated(createEmptyLearningPathStep)} />
      <Route path="sort(/)" components={{ main: LearningPathSummary, sortLearningSteps: SortLearningPathSteps }} onEnter={ifAuthenticated()} />
      <Route path=":stepId/edit(/)" component={requireAuthentication(EditLearningPathStep)} onEnter={ifAuthenticated(({ params }) => fetchLearningPathStep(params.pathId, params.stepId))} />
      <Route
        path=":stepId" components={{ main: LearningPathStep, addStepButton: AddLearningPathStepButton, saveButtons: LearningPathToCButtons }}
        onEnter={({ params }) => fetchLearningPathStep(params.pathId, params.stepId)}
      />
    </Route>
  );
}
