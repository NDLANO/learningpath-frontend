import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { setLearningPathStep } from '../../actions';
import Icon from '../Icon';

export function LearningPathPrevNext (props) {

  const {
    nextStep,
    prevStep,
    setEmptyStep,
    isFirstStep
  } = props;

  const stepperClassName = (object) => classNames({
    'stepper-nav-btn': true,
    'stepper-nav-btn_disabled': object === undefined
  });

  const stepperTag = (stepObject, leftText, rightText) => {
    if (stepObject && isFirstStep){
      return <Link to={stepObject} onClick={() => (setEmptyStep({}))} className={stepperClassName(stepObject)}> {leftText} {rightText} </Link>;
    }
    else if (stepObject){
      return <Link to={stepObject} className={stepperClassName(stepObject)}> {leftText} {rightText} </Link>;
    }
    else {
      return <span className={stepperClassName(stepObject)}> {leftText} {rightText} </span>;
    }
  };

  return (
    <div className='stepper-nav stepper-nav--fixed'>

      {stepperTag(prevStep, <Icon.ArrowBack/>, 'Forrige', false)}

      {stepperTag(nextStep, 'Neste', <Icon.ArrowForward/>, true)}

    </div>
  );
}

LearningPathPrevNext.propTypes = {
  nextStep: PropTypes.string,
  prevStep: PropTypes.string,
  currentSeqNo: PropTypes.number,
  setEmptyStep: PropTypes.func.isRequired,
  isFirstStep: PropTypes.bool.isRequired
};


const mapStateToProps = (state) => {
  const learningsteps = get(state.learningPath, 'learningsteps', []);
  const learningPathId = get(state.learningPath, 'id', -1);
  const base = `/learningpaths/${learningPathId}`;
  const currentSeqNo = get(state.learningPathStep, 'seqNo', -1);
  let prevUrl, nextUrl;

  if (currentSeqNo === -1){
    prevUrl = undefined;
    nextUrl = learningsteps.length > 0 ? base + '/step/' + learningsteps[0].id : undefined;
  }
  else {
    prevUrl = learningsteps[currentSeqNo - 1] ? base + '/step/' + learningsteps[currentSeqNo - 1].id : undefined;
    nextUrl = learningsteps[currentSeqNo + 1] ? base + '/step/' + learningsteps[currentSeqNo + 1].id : undefined;
  }
  prevUrl = currentSeqNo === 0 ? base : prevUrl;

  return Object.assign({}, state, {
    nextStep: nextUrl,
    prevStep: prevUrl,
    learningsteps,
    isFirstStep: currentSeqNo === 0
  });
};

export { mapStateToProps };

export const mapDispatchToProps = {
  setEmptyStep: setLearningPathStep
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningPathPrevNext);
