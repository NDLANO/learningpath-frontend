import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

const OnClickCheckbox = (field) => {
  const classes = {
    'learning-step-form_icon-bg': true,
    'learning-step-form_show-title': true,
    'learning-step-form_show-title--active': field.value
  };
  return (
    <span className={classNames(classes)} onClick={() => field.onChange(!field.value)}>
      {field.value ? <Icon.Visibility /> : <Icon.VisibilityOff />}
      <label className="sr-only">
        <input type="checkbox" {...field} />
      </label>
    </span>
  );
};

OnClickCheckbox.propTypes = {
  field: PropTypes.object// .isRequired
};
export default OnClickCheckbox;
