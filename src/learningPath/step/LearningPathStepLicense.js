/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import getLicenseByAbbreviation from 'ndla-licenses';
import LicenseIconList from 'ndla-ui/lib/license/LicenseIconList';
import polyglot from '../../i18n';

const LearningPathStepLicense = ({ learningPathStep }) => {
  if (!learningPathStep.license || !learningPathStep.license.license) {
    return null;
  }
  const license = getLicenseByAbbreviation(learningPathStep.license.license);
  const licenseText = license.rights.length === 0 ? polyglot.t('learningPathStep.license', { license: learningPathStep.license.description }) : <LicenseIconList licenseRights={license.rights} />;
  return (
    <span className="learning-step_license">
      {learningPathStep.license.url ?
        <a target="_blank" rel="noopener noreferrer" href={learningPathStep.license.url}>{licenseText}</a>
        : licenseText}
    </span>
  );
};

LearningPathStepLicense.propTypes = {
  learningPathStep: PropTypes.object.isRequired,
};

export default LearningPathStepLicense;
