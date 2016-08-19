/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import defined from 'defined';
import classNames from 'classnames';
import { connect } from 'react-redux';

import LearningPathStepIcon from '../../learningPath/step/LearningPathStepIcon';
import {
  closeSidebars,
  openLeftSidebar,
} from '../../common/sidebarActions';
import { titleI18N } from '../../util/i18nFieldFinder';

export function LearningPathToC({ learningPath, activeStepId, localCloseSidebars }, { lang }) {
  const base = `/learningpaths/${learningPath.id}`;
  const itemClassName = (stepId) => classNames({
    'step-nav_item': true,
    'step-nav_item--active': activeStepId ? activeStepId === stepId : false,
  });


  return (
    <div>
      <div className="step-nav">
        <ul className="step-nav_list">
          {((steps) => steps.map(step => (
            <li key={step.id} className={itemClassName(`${step.id}`)} >
              <Link to={`${base}/step/${step.id}`} className="step-nav_link" onClick={localCloseSidebars}>
                <div className="step-nav_line" />
                <LearningPathStepIcon learningPathStepType={step.type} isCircle />
                <div className="step-nav_title">
                  {titleI18N(step, lang, true)}
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
  activeStepId: PropTypes.string,
  localCloseSidebars: PropTypes.func.isRequired,
};

LearningPathToC.contextTypes = {
  lang: PropTypes.string.isRequired,
};

LearningPathToC.defaultProps = {
  activeStepId: '',
};


const mapStateToProps = state => state;
const mapDispatchToProps = {
  localCloseSidebars: closeSidebars,
  openTableOfContent: openLeftSidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningPathToC);
