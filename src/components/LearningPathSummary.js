import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { titleI18N, descriptionI18N } from '../util/i18nFieldFinder';
import polyglot from '../i18n';
import Icon from './Icon';

export function LearningPathSummary ({learningPath}, {lang}) {
  const editPathTarget = `/learningpaths/${learningPath.id}/edit`;
  let edit = '';
  if (learningPath.canEdit){
    edit =(
      <div className='block-container_fixed block-container_fixed--bottom--right'>
      </div>
    );
  }
  return (
    <div className='learning-path'>
      <div className='learning-path_hd'>
        <h1 className='learning-path_title'>{titleI18N(learningPath, lang)}</h1>
      </div>
      <div className='learning-path_bd'>{descriptionI18N(learningPath, lang)}</div>
      <div>
        {edit}
      </div>
    </div>

  );
}

LearningPathSummary.propTypes = {
  learningPath: PropTypes.object.isRequired
};

LearningPathSummary.contextTypes = {
  lang: PropTypes.string.isRequired
};

export default connect(state => state)(LearningPathSummary);
