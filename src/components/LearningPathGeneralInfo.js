import React, { PropTypes } from 'react';
import get from 'lodash/get';

import { titleI18N } from '../util/i18nFieldFinder';
import formatDate from '../util/formatDate';
import formatDuration from '../util/formatDuration';

import LabeledIcon from './LabeledIcon';


export default function LearningPathGeneralInfo ({learningPath, lang}) {
  return (
    <div className='learningpath-general-info'>
      <h3 className='learningpath-general-info_h'>{titleI18N(learningPath, lang)}</h3>
      <div className='learningpath-general-info_b'>
        <LabeledIcon.Person labelText={get(learningPath, 'author.name')} />
        <LabeledIcon.Today labelText={formatDate(learningPath.lastUpdated, lang)} tagName='time' />
        <LabeledIcon.QueryBuilder labelText={formatDuration(learningPath.duration, lang)} tagName='time' />
      </div>
    </div>
  );
}

LearningPathGeneralInfo.propTypes = {
  learningPath: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired
};
