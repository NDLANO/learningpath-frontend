/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import get from 'lodash/get';
import classNames from 'classnames';
import polyglot from '../../i18n';
import { titleI18N } from '../../util/i18nFieldFinder';

export function LearningPathPrevNext(props) {
  const {
    nextStep,
    prevStep,
    children,
  } = props;

  const stepperClassName = isRight => classNames({
    'learning-step_stepper': true,
    'learning-step_stepper--right': isRight,
  });
  const stepperTag = (stepObject, text, isRight) => (stepObject ? <Link className={stepperClassName(isRight)} to={stepObject.url}> {text} </Link> : null);
  return (
    <div>
      <div className="learning-step learning-step--padding-top">
        {stepperTag(prevStep, polyglot.t('learningPath.previous', { title: prevStep ? prevStep.title : '' }), false)}
      </div>
      {children}
      <div className="learning-step learning-step--padding-bottom learning-step--padding-top">
        {stepperTag(nextStep, polyglot.t('learningPath.next', { title: nextStep ? nextStep.title : '' }), true)}
      </div>
    </div>
  );
}

LearningPathPrevNext.propTypes = {
  currentStepId: PropTypes.number,
  nextStep: PropTypes.object,
  prevStep: PropTypes.object,
  currentSeqNo: PropTypes.number,
  currentStepNumber: PropTypes.number,
  lastPageNumber: PropTypes.number,
};


const mapStateToProps = (state, props) => {
  const { currentStepId, lang } = props;
  const learningsteps = get(state.learningPath, 'learningsteps', []);
  const learningPathId = get(state.learningPath, 'id', -1);
  const currentStep = learningsteps.find(step => step.id === currentStepId);
  const currentSeqNo = get(currentStep, 'seqNo', -1);

  const base = `/learningpaths/${learningPathId}`;

  const prevStep = learningsteps[currentSeqNo - 1] ? { url: `${base}/step/${learningsteps[currentSeqNo - 1].id}`, title: titleI18N(learningsteps[currentSeqNo - 1], lang, true) } : undefined;
  const nextStep = learningsteps[currentSeqNo + 1] ? { url: `${base}/step/${learningsteps[currentSeqNo + 1].id}`, title: titleI18N(learningsteps[currentSeqNo + 1], lang, true) } : undefined;
  return Object.assign({}, state, {
    prevStep,
    nextStep,
  });
};

export default connect(mapStateToProps)(LearningPathPrevNext);
