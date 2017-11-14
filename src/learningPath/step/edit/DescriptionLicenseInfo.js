/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import classNames from 'classnames';
import Icon from '../../../common/Icon';
import Tooltip from '../../../common/tooltip/Tooltip';
import OverlayTrigger from '../../../common/tooltip/OverlayTrigger';
import polyglot from '../../../i18n';

const DescriptionLicenseInfo = () => {
  const classes = {
    'learning-step-form_icon-bg': true,
    'learning-step-form_show_license_info': true,
    'learning-step-form_show_license_info--active': false,
  };
  const tooltip = (
    <Tooltip id="showLicenseInfoTooltip">
      {polyglot.t('editPathStep.showLicenseInfo')}
    </Tooltip>
  );

  return (
    <OverlayTrigger placement="top" overlay={tooltip}>
      <span className={classNames(classes)}>
        <Icon.HelpOutline />
      </span>
    </OverlayTrigger>
  );
};
export default DescriptionLicenseInfo;
