/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import last from 'lodash/last';
import LearningPathStepIcon from '../../learningPath/step/LearningPathStepIcon';
import { titleI18N } from '../../util/i18nFieldFinder';

const LearningPathToCStep = ({ learningPath, activeStepId, localCloseSidebars, hasAddStepButton, step, steps }, { lang }) => {
  const base = `/learningpaths/${learningPath.id}`;
  const itemClassName = stepId => classNames({
    'step-nav_item': true,
    'step-nav_item--active': activeStepId ? activeStepId === stepId : false,
    'step-nav_item--bottom_border': ((hasAddStepButton && learningPath.canEdit) || (!hasAddStepButton && step !== last(steps)) || (step !== last(steps) && !learningPath.canEdit)),
  });
  return (
    <li className={itemClassName(`${step.id}`)} >
      <Link to={`${base}/step/${step.id}`} className="step-nav_link" onClick={localCloseSidebars}>
        {steps.length > 1 ? <div className="step-nav_line" /> : ''}
        <LearningPathStepIcon learningPathStepType={step.type} isCircle />
        <div className="step-nav_title">
          {titleI18N(step, lang, true)}
        </div>
      </Link>
    </li>
  );
};

LearningPathToCStep.propTypes = {
  learningPath: PropTypes.object.isRequired,
  step: PropTypes.object.isRequired,
  activeStepId: PropTypes.string,
  localCloseSidebars: PropTypes.func.isRequired,
  hasAddStepButton: PropTypes.bool.isRequired,
  steps: PropTypes.array.isRequired,
};

LearningPathToCStep.contextTypes = {
  lang: PropTypes.string.isRequired,
};

LearningPathToCStep.defaultProps = {
  activeStepId: '',
};

export default LearningPathToCStep;
