/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import last from 'lodash/last';
import LearningPathStepIcon from '../../learningPath/step/LearningPathStepIcon';
import Icon from '../../common/Icon';

const LearningPathToCStep = (props) => {
  const { learningPath, activeStepId, localCloseSidebars, step, steps } = props;
  const base = `/learningpaths/${learningPath.id}`;
  const itemClassName = stepId => classNames({
    'step-nav_item': true,
    'step-nav_item--active': activeStepId ? activeStepId === stepId : false,
    'step-nav_item--bottom_border': step !== last(steps),
  });
  const isActiveAndCanEdit = activeStepId === step.id.toString() && learningPath.canEdit;
  const linkUrl = isActiveAndCanEdit ? `${base}/step/${step.id}/edit` : `${base}/step/${step.id}`;
  return (
    <li className={itemClassName(`${step.id}`)} >
      <Link to={linkUrl} className="step-nav_link" onClick={() => localCloseSidebars()}>
        {steps.length > 1 ? <div className="step-nav_line" /> : ''}
        <LearningPathStepIcon learningPathStepType={step.type} isCircle />
        <div className="step-nav_title">
          <span>
            {step.title}
          </span>
          {isActiveAndCanEdit ? <Icon.Create /> : ''}
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
  steps: PropTypes.array.isRequired,
};

LearningPathToCStep.defaultProps = {
  activeStepId: '',
};

export default LearningPathToCStep;
