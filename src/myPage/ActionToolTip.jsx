/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import PropTypes from "prop-types";
import Tooltip from "../common/tooltip/Tooltip";
import OverlayTrigger from "../common/tooltip/OverlayTrigger";
import polyglot from "../i18n";

const ActionToolTip = ({ status, children }) => {
  const tooltip = (
    <Tooltip id="showLicenseInfoTooltip">{polyglot.t(`updateLearningPathStatus.consequence.${status}`)}</Tooltip>
  );
  return (
    <OverlayTrigger placement="right" overlay={tooltip}>
      {children}
    </OverlayTrigger>
  );
};

ActionToolTip.propTypes = {
  status: PropTypes.string.isRequired,
};
export default ActionToolTip;
