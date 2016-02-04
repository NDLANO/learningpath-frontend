import React, { PropTypes } from 'react';
import { titleI18N, descriptionI18N } from '../util/i18nFieldFinder';

export default function LearningStep ({step, lang}) {
  return (
    <div className='learning-step'>
      <h2 className='learning-step_title'>{titleI18N(step, lang)}</h2>
      <div className='learing-step_description'>
        {descriptionI18N(step, lang)}
      </div>
    </div>
  );
}

LearningStep.propTypes = {
  step: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired
};
