/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { titleI18N, descriptionI18N } from '../../util/i18nFieldFinder';

export default function LearningPathSummary({ learningPath, lang }) {
  return (
    <main className="two-column_col two-column_col--center">
      <div className="learning-path">
        <div className="learning-path_hd">
          <h1 className="learning-path_title">{titleI18N(learningPath, lang, true)}</h1>
        </div>
        <div className="learning-path_bd">
          <div>
            {descriptionI18N(learningPath, lang, true)}
          </div>
        </div>
      </div>
    </main>

  );
}

LearningPathSummary.propTypes = {
  learningPath: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
};
