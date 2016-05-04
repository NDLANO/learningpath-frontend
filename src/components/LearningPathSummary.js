import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { titleI18N, descriptionI18N } from '../util/i18nFieldFinder';
import polyglot from '../i18n';

export function LearningPathSummary ({learningPath}, {lang}) {
  const editPathTarget = `/learningpaths/${learningPath.id}/edit`;
  const edit = learningPath.canEdit ? <Link to={editPathTarget}>{polyglot.t('editPage.edit')}</Link> : '';

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
