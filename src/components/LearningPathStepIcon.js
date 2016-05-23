import React, { PropTypes } from 'react';
import Icon from './Icon';
export default function LearningPathStepIcon({learningPathStepType}) {

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
  return (
    <div className="step-nav_circle">
      {iconClassName(learningPathStepType)}
    </div>
  );
}
LearningPathStepIcon.propTypes = {
  learningPathStepType: PropTypes.string.isRequired
};
