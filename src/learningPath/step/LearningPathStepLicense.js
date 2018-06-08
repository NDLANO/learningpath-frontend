/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { getLicenseByAbbreviation } from 'ndla-licenses/lib/licenses';
import LicenseByline from 'ndla-ui/lib/LicenseByline';
import LearningPathContributors from '../sidebar/LearningPathContributors';
import polyglot from '../../i18n';
import { CopyrightObjectShape } from '../../shapes';

const LearningPathStepLicense = ({ learningPathStep, copyright }) => {
  if (!learningPathStep.license || !learningPathStep.license.license) {
    return null;
  }
  const license = getLicenseByAbbreviation(learningPathStep.license.license);
  const licenseText =
    license.rights.length === 0 ? (
      polyglot.t('learningPathStep.license', {
        license: learningPathStep.license.description,
      })
    ) : (
      <LicenseByline licenseRights={license.rights} />
    );

  return (
    <span className="learning-step_license">
      {learningPathStep.license.url ? (
        <div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={learningPathStep.license.url}>
            {licenseText}
          </a>
          {' - '}
          <LearningPathContributors copyright={copyright} />
        </div>
      ) : (
        licenseText
      )}
    </span>
  );
};

LearningPathStepLicense.propTypes = {
  learningPathStep: PropTypes.object.isRequired,
  copyright: CopyrightObjectShape,
};

export default LearningPathStepLicense;
