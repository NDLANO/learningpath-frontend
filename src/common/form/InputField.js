/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({
  input,
  label,
  placeholder,
  labelClassName,
  type,
  maxLength,
  meta: { touched, error },
}) => {
  const inputClassName = touched && error ? 'input--alert' : '';
  return (
    <div>
      <label className={labelClassName} htmlFor={input.name}>
        {label}
      </label>
      <input
        {...input}
        placeholder={placeholder}
        type={type}
        className={inputClassName}
        maxLength={maxLength}
      />
      {touched &&
        error && (
          <span className="error_message error_message--red">{error}</span>
        )}
    </div>
  );
};
InputField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  labelClassName: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.string,
};
InputField.defaultProps = {
  type: 'text',
  placeholder: '',
  labelClassName: '',
};
export default InputField;
