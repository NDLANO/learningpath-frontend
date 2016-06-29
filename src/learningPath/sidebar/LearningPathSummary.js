import React, { PropTypes } from 'react';
import { titleI18N, descriptionI18N } from '../../util/i18nFieldFinder';
export default function LearningPathSummary({learningPath, lang}) {
  return (
    <main className="two-column_col two-column_col--center">
      <div className="learning-path">
        <div className="learning-path_hd">
          <h1 className="learning-path_title">{titleI18N(learningPath, lang, true)}</h1>
        </div>
        <div className="learning-path_bd">{descriptionI18N(learningPath, lang, true)}</div>
      </div>
    </main>

  );
}

LearningPathSummary.propTypes = {
  learningPath: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired
};
