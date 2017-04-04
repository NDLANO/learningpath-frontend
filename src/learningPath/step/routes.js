/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


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
import PinterestLightboxButton from '../../pinterest/PinterestLightboxButton';

export default function (store, ifAuthenticated) {
  const {
    createEmptyLearningPathStep,
  } = bindActionCreators(actions, store.dispatch);

  return (
    <Route path="step(/)">
      <Route path="new(/)" component={requireAuthentication(CreateLearningPathStep)} onEnter={ifAuthenticated(createEmptyLearningPathStep)} />
      <Route path="sort(/)" components={{ main: LearningPathSummary, sortLearningSteps: SortLearningPathSteps }} />
      <Route
        path=":stepId/edit(/)" component={requireAuthentication(EditLearningPathStep)}
      />
      <Route
        path=":stepId" components={{ main: LearningPathStep, addStepButton: AddLearningPathStepButton, changeStatusButton: LearningPathToCButtons, pinterestButton: PinterestLightboxButton }}
      />
    </Route>
  );
}
