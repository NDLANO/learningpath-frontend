import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { connect } from 'react-redux';
import get from 'lodash/get';
import Icon from '../common/Icon';
import polyglot from '../i18n';

export function LearningPathPrevNext(props) {
  const {
    nextStep,
    prevStep,
    currentStepNumber,
    lastPageNumber,
  } = props;

  const stepperClassName = (object) => classNames({
    'stepper-nav_button': true,
    'stepper-nav_button--disabled': object === undefined,
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
      <span className="stepper-nav_text-information">
        <b>{currentStepNumber} </b>
        {polyglot.t('learningPath.of')}
        <b> {lastPageNumber}</b>
      </span>
      {stepperTag(nextStep, polyglot.t('learningPath.next'), <Icon.ArrowForward />, true)}
    </div>
  );
}

LearningPathPrevNext.propTypes = {
  currentStepId: PropTypes.string,
  nextStep: PropTypes.string,
  prevStep: PropTypes.string,
  currentSeqNo: PropTypes.number,
  currentStepNumber: PropTypes.number,
  lastPageNumber: PropTypes.number,
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
      nextStep: learningsteps.length > 0 ? `${base}/step/${learningsteps[0].id}` : undefined,
      currentStepNumber: 1,
      lastPageNumber: learningsteps.length + 1,
    });
  }

  const prevUrl = learningsteps[currentSeqNo - 1] ? `${base}/step/${learningsteps[currentSeqNo - 1].id}` : undefined;
  const nextUrl = learningsteps[currentSeqNo + 1] ? `${base}/step/${learningsteps[currentSeqNo + 1].id}` : undefined;
  return Object.assign({}, state, {
    prevStep: currentSeqNo === 0 ? base : prevUrl,
    nextStep: nextUrl,
    currentStepNumber: currentSeqNo + 2, // zero indexed and the meta site is page number 1 so this must be plus two.
    lastPageNumber: learningsteps.length + 1,
  });
};

export default connect(mapStateToProps)(LearningPathPrevNext);
