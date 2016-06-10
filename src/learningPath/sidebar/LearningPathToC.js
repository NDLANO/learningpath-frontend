import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import defined from 'defined';
import classNames from 'classnames';
import LearningPathStepIcon from '../../learningPath/step/LearningPathStepIcon';
import { connect } from 'react-redux';
import {
  closeSidebars,
  openLeftSidebar,
} from '../../actions';
import { titleI18N } from '../../util/i18nFieldFinder';

export function LearningPathToC({learningPath, activePathname, localCloseSidebars}, {lang}) {
  const base = `/learningpaths/${learningPath.id}`;
  const itemClassName = (path) => classNames({
    'step-nav_item': true,
    'step-nav_item--active': activePathname ? activePathname === path : false
  });


  return (
    <div>
      <div className="step-nav">
        <ul className="step-nav_list">
          {((steps) => steps.map(step => (
            <li key={step.id} className={itemClassName(`${base}/step/${step.id}`)} >
              <Link to={`${base}/step/${step.id}`} className="step-nav_link" onClick={localCloseSidebars}>
                <div className="step-nav_line" />
                <LearningPathStepIcon learningPathStepType={step.type} isCircle />
                <div className="step-nav_title">
                  {titleI18N(step, lang)}
                </div>
              </Link>
            </li>
          )))(defined(learningPath.learningsteps, []))}
        </ul>
      </div>
    </div>
  );
}

LearningPathToC.propTypes = {
  learningPath: PropTypes.object.isRequired,
  activePathname: PropTypes.string,
  localCloseSidebars: PropTypes.func.isRequired,
};

LearningPathToC.contextTypes = {
  lang: PropTypes.string.isRequired
};

LearningPathToC.defaultProps = {
  activePathname: ''
};


const mapStateToProps = state => state;
const mapDispatchToProps = {
  localCloseSidebars: closeSidebars,
  openTableOfContent: openLeftSidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningPathToC);
