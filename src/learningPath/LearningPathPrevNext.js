import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { connect } from 'react-redux';
import get from 'lodash/get';
import Icon from '../components/Icon';
import polyglot from '../i18n';

export function LearningPathPrevNext(props) {
  const {
    nextStep,
    prevStep
  } = props;

  const stepperClassName = (object) => classNames({
    'stepper-nav-btn': true,
    'stepper-nav-btn_disabled': object === undefined
  });

  const stepperTag = (stepObject, leftText, rightText) => {
    if (stepObject) {
      return <Link to={stepObject} className={stepperClassName(stepObject)}> {leftText} {rightText} </Link>;
    }
    return <span className={stepperClassName(stepObject)}> {leftText} {rightText} </span>;
  };

  return (
    <div className="stepper-nav stepper-nav--fixed">
      {stepperTag(prevStep, <Icon.ArrowBack />, polyglot.t('learningPath.previous'), false)}
      {stepperTag(nextStep, polyglot.t('learningPath.next'), <Icon.ArrowForward />, true)}
    </div>
  );
}

LearningPathPrevNext.propTypes = {
  currentStepId: PropTypes.string,
  nextStep: PropTypes.string,
  prevStep: PropTypes.string,
  currentSeqNo: PropTypes.number
};


const mapStateToProps = (state, props) => {
  const { currentStepId } = props;
  const learningsteps = get(state.learningPath, 'learningsteps', []);
  const learningPathId = get(state.learningPath, 'id', -1);
  const currentStep = learningsteps.find(step => step.id.toString() === currentStepId);
  const currentSeqNo = get(currentStep, 'seqNo', -1);

  const base = `/learningpaths/${learningPathId}`;

  if (currentSeqNo === -1) {
    return Object.assign({}, state, {
      prevStep: undefined,
      nextStep: learningsteps.length > 0 ? `${base}/step/${learningsteps[0].id}` : undefined
    });
  }

  const prevUrl = learningsteps[currentSeqNo - 1] ? `${base}/step/${learningsteps[currentSeqNo - 1].id}` : undefined;
  const nextUrl = learningsteps[currentSeqNo + 1] ? `${base}/step/${learningsteps[currentSeqNo + 1].id}` : undefined;
  return Object.assign({}, state, {
    prevStep: currentSeqNo === 0 ? base : prevUrl,
    nextStep: nextUrl
  });
};

export default connect(mapStateToProps)(LearningPathPrevNext);
