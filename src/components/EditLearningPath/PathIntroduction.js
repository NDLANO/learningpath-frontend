import React from 'react';
import get from 'lodash/get';
import { descriptionI18N } from '../../util/i18nFieldFinder';

export default function PathIntroduction (props) {
  let learningPath = get(props, 'learningPath', {});
  let description = descriptionI18N(learningPath, props.lang);

  return (
    <div className='learning-path_introduction'>
      <div className='learning-path_hd'>
        <h1 className='learning-path_title'>Kort beskrivelse (max. 150 tegn)</h1>
      </div>
      <div className='learning-path_bd'>
        {description}
      </div>
    </div>
  );
}
