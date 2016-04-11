import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import defined from 'defined';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { titleI18N } from '../util/i18nFieldFinder';

export default function LearningPathPrevNext ({learningPath, isPrivate, activePathname, nextUrl, prevUrl}, {lang}) {

  const base = `/learningpaths${isPrivate ? '/private' : ''}/${learningPath.id}`;

  const stepperClassName = (object) => classNames({
    'stepper-nav-btn': true,
    'stepper-nav-btn_disabled': object === undefined
  });

  const nextName = 'Neste >>';
  const prevName = '<< Forrige';

  const stepperUrl = (object) => {
    if (object === undefined){
      return '#';
    }
    return `${base}/step/${object.id}`;
  };


  return (
    <div className='stepper-nav'>
      <Link to={`${stepperUrl(prevUrl)}`} className={stepperClassName(prevUrl)}>
        {prevName}
      </Link>
      {((steps) => steps.map(step => (
        <Link to={`${base}/step/${step.id}`} className='stepper-nav-stepp' data-value={titleI18N(step, lang)} />
      )))(defined(learningPath.learningsteps, []))}
      <Link to={`${stepperUrl(nextUrl)}`} className={stepperClassName(nextUrl)}>
        {nextName}
      </Link>
    </div>
  );
}

LearningPathPrevNext.propTypes = {
  learningPath: PropTypes.object.isRequired,
  activePathname: PropTypes.string,
  isPrivate: PropTypes.bool,
  nextUrl: PropTypes.object,
  prevUrl: PropTypes.object
};

LearningPathPrevNext.contextTypes = {
  lang: PropTypes.string.isRequired
};

LearningPathPrevNext.defaultProps = {
  activePathname: '',
  isPrivate: false
};

const mapStateToProps = (state) => {
  const learningPathStep = state.learningPathStep;
  const learningsteps = state.learningPath.learningsteps;

  if (learningPathStep != undefined && learningsteps != undefined){
    const currentSeqNo = learningPathStep.seqNo - 1;

    return Object.assign({}, state, {
      nextUrl: learningsteps[currentSeqNo + 1],
      prevUrl: learningsteps[currentSeqNo - 1]
    });
  }
};

export { mapStateToProps };

export default connect(mapStateToProps)(LearningPathPrevNext);
