import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { setLearningPathStep } from '../../actions';
import Icon from '../Icon';

export function LearningPathPrevNext (props) {

  const {
    learningPath,
    nextUrl,
    prevUrl,
    currentSeqNo,
    setEmptyStep
  } = props;

  const base = `/learningpaths/${learningPath.id}`;

  const stepperClassName = (object) => classNames({
    'stepper-nav-btn': true,
    'stepper-nav-btn_disabled': object === undefined
  });

  const stepperUrl = (object) => (object === undefined) ? `${base}` : `${base}/step/${object.id}`;


  const stepperTag = (object, currentSeqNo, text) => {
    if (object != undefined){
      return <Link to={`${stepperUrl(object)}`} className={stepperClassName(object)}> {text} </Link>;
    }
    else if (currentSeqNo === 0){
      return <Link to={`${base}`} onClick={setEmptyStep} className='stepper-nav-btn'> {text} </Link>;
    }
    else {
      return <span className={stepperClassName(object)}> {text} </span>;
    }
  };

  const formattedText = (text, icon, forward) => {
    return forward ? <span>{text} {icon} </span> : <span> {icon} {text} </span>;
  };

  return (
    <div className='stepper-nav stepper-nav_fixed'>

      {stepperTag(prevUrl, currentSeqNo, formattedText('Forrige', <Icon.ArrowBack/>, false))}

      {stepperTag(nextUrl, currentSeqNo, formattedText('Neste', <Icon.ArrowForward/>, true))}

    </div>
  );
}

LearningPathPrevNext.propTypes = {
  learningPath: PropTypes.object.isRequired,
  nextUrl: PropTypes.object,
  prevUrl: PropTypes.object,
  currentSeqNo: PropTypes.number,
  setEmptyStep: PropTypes.func.isRequired
};


const mapStateToProps = (state) => {
  const learningsteps = get(state.learningPath, 'learningsteps', []);

  const currentSeqNo = get(state.learningPathStep, 'seqNo', -1);
  return Object.assign({}, state, {
    currentSeqNo: currentSeqNo,
    nextUrl: learningsteps[currentSeqNo + 1],
    prevUrl: learningsteps[currentSeqNo - 1],
    learningsteps
  });
};

export { mapStateToProps };

export const mapDispatchToProps = {
  setEmptyStep: setLearningPathStep
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningPathPrevNext);
