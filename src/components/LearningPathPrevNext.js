import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import defined from 'defined';
import classNames from 'classnames';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import { titleI18N } from '../util/i18nFieldFinder';

export function LearningPathPrevNext ({learningPath, learningsteps, activePathname, nextUrl, prevUrl}, {lang}) {

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
    <div className='stepper-nav'>

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
  activePathname: PropTypes.string,
  nextUrl: PropTypes.object,
  prevUrl: PropTypes.object
};

LearningPathPrevNext.contextTypes = {
  lang: PropTypes.string.isRequired
};

LearningPathPrevNext.defaultProps = {
  activePathname: '',
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
