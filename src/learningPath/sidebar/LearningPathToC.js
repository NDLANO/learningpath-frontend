/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import defined from 'defined';
import { connect } from 'react-redux';
import { closeSidebars } from '../../common/sidebarActions';
import LearningPathToCStep from './LearningPathToCStep';
import { getLearningPath } from '../learningPathSelectors';

export function LearningPathToC(props) {
  const { learningPath, activeStepId, localCloseSidebars } = props;
  const steps = defined(learningPath.learningsteps, []);
  return (
    <div>
      <div className="step-nav">
        <ul className="step-nav_list">
          {(steps.map(step => (
            <LearningPathToCStep
              key={step.id}
              step={step}
              learningPath={learningPath}
              localCloseSidebars={localCloseSidebars}
              activeStepId={activeStepId}
              steps={steps}
            />
          )))}
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


const mapStateToProps = state => Object.assign({}, state, {
  learningPath: getLearningPath(state),
});

const mapDispatchToProps = {
  localCloseSidebars: closeSidebars,
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningPathToC);
