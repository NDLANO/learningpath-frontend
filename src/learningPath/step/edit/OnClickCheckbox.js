/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import noop from 'lodash/noop';
import Icon from '../../../common/Icon';
import Tooltip from '../../../common/tooltip/Tooltip';
import OverlayTrigger from '../../../common/tooltip/OverlayTrigger';

const OnClickCheckbox = ({ input }) => {
  const classes = {
    'learning-step-form_icon-bg': true,
    'learning-step-form_show-title': true,
    'learning-step-form_show-title--active': input.value,
  };
  const tooltip = <Tooltip id="showTitleTooltip">Velg om titelen skal vises eller skjules</Tooltip>;
  const handleClick = () => {
    input.onChange(!input.value);
    input.onBlur(!input.value);
  };

  return (
    <OverlayTrigger placement="top" overlay={tooltip}>
      <span className={classNames(classes)} onClick={handleClick} >
        {input.value ? <Icon.Visibility /> : <Icon.VisibilityOff />}
        <label htmlFor="visibility" className="sr-only">
          <input id="visibility" type="checkbox" {...input} onClick={handleClick} onBlur={noop} />
        </label>
      </span>
    </OverlayTrigger>
  );
};

OnClickCheckbox.propTypes = {
  input: PropTypes.object, // .isRequired
};
export default OnClickCheckbox;
