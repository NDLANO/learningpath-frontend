/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import LearningPathContributors from './LearningPathContributors';
import LearningPathLicense from './LearningPathLicense';

const LearningPathCopyright = ({ copyright }) => {
  if (!copyright) {
    return null;
  }
  return (
    <div className="learningpath-copyright">
      <div className="learningpath-contributors">
        <LearningPathContributors copyright={copyright} />
      </div>
      <div className="learningpath-license">
        <LearningPathLicense copyright={copyright} />
      </div>
    </div>
  );
};
LearningPathCopyright.propTypes = {
  copyright: PropTypes.object,
};

export default LearningPathCopyright;
