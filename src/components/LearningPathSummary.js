import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { titleI18N, descriptionI18N } from '../util/i18nFieldFinder';
import Main from './Main';
export function LearningPathSummary({learningPath}, {lang}) {
  return (
    <Main className="two-column_col two-column_col--center">
      <div className="learning-path">
        <div className="learning-path_hd">
          <h1 className="learning-path_title">{titleI18N(learningPath, lang)}</h1>
        </div>
        <div className="learning-path_bd">{descriptionI18N(learningPath, lang)}</div>
      </div>
    </Main>

  );
}

LearningPathSummary.propTypes = {
  learningPath: PropTypes.object.isRequired
};

LearningPathSummary.contextTypes = {
  lang: PropTypes.string.isRequired
};

export default connect(state => state)(LearningPathSummary);
