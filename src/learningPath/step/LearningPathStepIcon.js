/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../../common/Icon';

export default function LearningPathStepIcon({ learningPathStepType, isCircle }) {
  const iconClassName = (type) => {
    switch (type) {
      case 'INTRODUCTION':
      case 'TEXT':
      case 'TASK':
      case 'SUMMARY':
        return <Icon.TypeText />;
      case 'MULTIMEDIA':
        return <Icon.TypeMedia />;
      case 'QUIZ':
        return <Icon.TypeQuiz />;
      default:
        return <Icon.TypeText />;
    }
  };

  const divClassName = () => classNames({
    'step-nav_circle': isCircle,
  });

  return (
    <div className={divClassName()}>
      {iconClassName(learningPathStepType)}
    </div>
  );
}

LearningPathStepIcon.propTypes = {
  learningPathStepType: PropTypes.string.isRequired,
  isCircle: PropTypes.bool.isRequired,
};
