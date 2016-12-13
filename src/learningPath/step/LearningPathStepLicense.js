/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import polyglot from '../../i18n';

const LearningPathStepLicense = ({ learningPathStep }) => {
  if (!learningPathStep.license || !learningPathStep.license.license) {
    return null;
  }

  return (
    <p className="learning-step_license">
      {learningPathStep.license.url ?
        <a target="_blank" rel="noopener noreferrer" href={learningPathStep.license.url}>{polyglot.t('learningPathStep.license', { license: learningPathStep.license.license })}</a>
      : polyglot.t('learningPathStep.license', { license: learningPathStep.license.license })}
    </p>
  );
};

LearningPathStepLicense.propTypes = {
  learningPathStep: PropTypes.object.isRequired,
};

export default LearningPathStepLicense;
