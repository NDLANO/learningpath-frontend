import LearningPathTocTypes from './LearningPath/LearningPathTocTypes';
import indexOf from 'lodash/indexOf';
import React, { PropTypes } from 'react';
import Icon from './Icon';
export default function LearningPathStepIcon ({learningPathStep}) {

  const iconClassName = (type) => {
    if (indexOf(LearningPathTocTypes.TEXT_TYPE, type) != -1){
      return <Icon.TypeText />;
    }
    else if (indexOf(LearningPathTocTypes.MULTIMEDIA, type) != -1){
      return <Icon.TypeMedia />;
    }
    else if(indexOf(LearningPathTocTypes.QUIZ, type) != -1){
      return <Icon.TypeQuiz />;
    }
    return <Icon.TypeText />;
  };
  return (
    <div className='step-nav_circle'>
      {iconClassName(learningPathStep.type)}
    </div>
  );
}
LearningPathStepIcon.propTypes = {
  learningPathStep: PropTypes.object.isRequired
};
LearningPathStepIcon.defaultProps = {
  learningPathStep: {type: ''}
};
