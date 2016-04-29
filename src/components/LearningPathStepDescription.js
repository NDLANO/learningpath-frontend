import React, { PropTypes } from 'react';

export default function LearningPathStepDescription ({stepTitle, stepDescription}) {
  return (
    <div className='learning-step'>
      <div className='learning-step_hd'>
        <h1 className='learning-step_title'>{stepTitle}</h1>
      </div>
      <div className='learning-step_bd' dangerouslySetInnerHTML={{__html: stepDescription}}/>
    </div>
  );
}

LearningPathStepDescription.propTypes = {
  stepTitle: PropTypes.string.isRequired,
  stepDescription: PropTypes.string.isRequired
};

LearningPathStepDescription.defaultProps = {
  stepTitle: '',
  stepDescription: ''
};
