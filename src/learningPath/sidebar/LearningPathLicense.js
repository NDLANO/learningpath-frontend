/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import LabeledIcon from '../../common/LabeledIcon';

const LearningPathLicense = ({ copyright }) => {
  if (!copyright.license) {
    return null;
  }
  return (
    <span>
      {copyright.license.url ?
        <a href={copyright.license.url} rel="noopener noreferrer" target="_blank"><LabeledIcon.Copyright tagName="copyright" labelText={copyright.license.license} /></a> : ''}
    </span>
  );
};
LearningPathLicense.propTypes = {
  copyright: PropTypes.object.isRequired,
};

export default LearningPathLicense;
