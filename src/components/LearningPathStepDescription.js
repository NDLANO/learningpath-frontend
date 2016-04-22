import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { titleI18N, descriptionI18N } from '../util/i18nFieldFinder';


export function LearningPathStepDescription ({learningPathStep}, {lang}) {
  return (
    <div className='learning-step'>
      <div className='learning-step_hd'>
        <h1 className='learning-step_title'>{titleI18N(learningPathStep, lang)}</h1>
      </div>
      <div className='learning-step_bd' dangerouslySetInnerHTML={{__html: descriptionI18N(learningPathStep, lang)}}/>
    </div>
  );
}

LearningPathStepDescription.propTypes = {
  learningPathStep: PropTypes.object.isRequired
};

LearningPathStepDescription.contextTypes = {
  lang: PropTypes.string.isRequired
};

export default connect(state => state)(LearningPathStepDescription);
