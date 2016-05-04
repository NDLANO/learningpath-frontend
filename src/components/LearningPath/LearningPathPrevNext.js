import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { connect } from 'react-redux';
import get from 'lodash/get';

import { titleI18N } from '../../util/i18nFieldFinder';

export function LearningPathPrevNext ({learningPath, learningsteps, nextUrl, prevUrl}, {lang}) {

  const base = `/learningpaths/${learningPath.id}`;

  const stepperClassName = (object) => classNames({
    'stepper-nav-btn': true,
    'stepper-nav-btn_disabled': object === undefined
  });

  const stepperUrl = (object) => (object === undefined) ? '#' : `${base}/step/${object.id}`;


  const stepperTag = (object, text) => (object === undefined) ?
    <span className={stepperClassName(object)}> {text} </span> :
    <Link to={`${stepperUrl(object)}`} className={stepperClassName(object)}> {text} </Link>;

  return (
    <div className='stepper-nav stepper-nav_fixed'>

      {stepperTag(prevUrl, '<< Forrige')}
      {learningsteps.map(step => (
        <Link to={`${base}/step/${step.id}`} key={step.id} className='stepper-nav-stepp' data-value={titleI18N(step, lang)} />
      ))}
      {stepperTag(nextUrl, 'Neste >>')}

    </div>
  );
}

LearningPathPrevNext.propTypes = {
  learningPath: PropTypes.object.isRequired,
  nextUrl: PropTypes.object,
  prevUrl: PropTypes.object,
  learningsteps: PropTypes.array.isRequired
};

LearningPathPrevNext.contextTypes = {
  lang: PropTypes.string.isRequired
};


const mapStateToProps = (state) => {
  const learningsteps = get(state.learningPath, 'learningsteps', []);

  const currentSeqNo = get(state.learningPathStep, 'seqNo', -1) - 1;

  return Object.assign({}, state, {
    nextUrl: learningsteps[currentSeqNo + 1],
    prevUrl: learningsteps[currentSeqNo - 1],
    learningsteps
  });
};

export { mapStateToProps };

export default connect(mapStateToProps)(LearningPathPrevNext);
