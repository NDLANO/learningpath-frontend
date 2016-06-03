import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import Tooltip from '../../common/tooltip/Tooltip';
import OverlayTrigger from '../../common/tooltip/OverlayTrigger';

const OnClickCheckbox = (field) => {
  const classes = {
    'learning-step-form_icon-bg': true,
    'learning-step-form_show-title': true,
    'learning-step-form_show-title--active': field.value
  };
  const tooltip = <Tooltip id="showTitleTooltip">Velg om titelen skal vises eller skjules</Tooltip>;

  return (
    <OverlayTrigger placement="top" overlay={tooltip}>
      <span className={classNames(classes)} onClick={() => field.onChange(!field.value)}>
        {field.value ? <Icon.Visibility /> : <Icon.VisibilityOff />}
        <label className="sr-only">
          <input type="checkbox" {...field} />
        </label>
      </span>
    </OverlayTrigger>
  );
};

OnClickCheckbox.propTypes = {
  field: PropTypes.object// .isRequired
};
export default OnClickCheckbox;
