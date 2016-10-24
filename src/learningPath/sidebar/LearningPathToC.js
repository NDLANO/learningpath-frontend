/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import defined from 'defined';
import { connect } from 'react-redux';
import { closeSidebars } from '../../common/sidebarActions';
import LearningPathToCStep from './LearningPathToCStep';

export function LearningPathToC({ learningPath, activeStepId, localCloseSidebars, hasAddStepButton }) {
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
              hasAddStepButton={hasAddStepButton}
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
  hasAddStepButton: PropTypes.bool.isRequired,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningPathToC);
