/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';

const LearningPathSummary = ({ learningPath, lang }) => {
  if (!learningPath || !lang) {
    return null;
  }
  return (
    <div className="two-column_content">
      <div className="learning-path">
        <div className="learning-path_hd">
          <h1 className="learning-path_title">{learningPath.title}</h1>
        </div>
        <div className="learning-path_bd">
          <div>
            {learningPath.description}
          </div>
        </div>
      </div>
    </div>
  );
};

LearningPathSummary.propTypes = {
  learningPath: PropTypes.object,
  lang: PropTypes.string,
};

export default LearningPathSummary;
