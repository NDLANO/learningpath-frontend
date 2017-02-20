/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import getLicenseByAbbreviation from 'ndla-licenses';
import { LicenseIconList } from 'ndla-ui';

const LearningPathLicense = ({ copyright }) => {
  if (!copyright || !copyright.license) {
    return null;
  }
  const license = getLicenseByAbbreviation(copyright.license.license);
  return (
    <span>
      {copyright.license.url ?
        <a href={copyright.license.url} rel="noopener noreferrer" target="_blank"> <LicenseIconList licenseRights={license.rights} /></a> : ''}
    </span>
  );
};
LearningPathLicense.propTypes = {
  copyright: PropTypes.object,
};

export default LearningPathLicense;
