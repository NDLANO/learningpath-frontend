/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TextAreaField = props => {
  const {
    input,
    disableVerticalResize,
    disableHorizontalResize,
    rows,
    cols,
    maxLength,
    label,
    placeholder,
    labelClassName,
    type,
    meta: { touched, error },
  } = props;

  const inputClassName = classNames({
    textarea: true,
    'input--alert': touched && error,
    'textarea--resize-vertical': disableVerticalResize,
    'textarea--resize-horizontal': disableHorizontalResize,
  });

  return (
    <div>
      <label className={labelClassName} htmlFor={input.name}>
        {label}
      </label>
      <textarea
        {...input}
        rows={rows}
        cols={cols}
        maxLength={maxLength}
        placeholder={placeholder}
        type={type}
        className={inputClassName}
        data-cy={props['data-cy']}
      />
      {touched &&
        error && (
          <span className="error_message error_message--red">{error}</span>
        )}
    </div>
  );
};
TextAreaField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  labelClassName: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.string,
  cols: PropTypes.string,
  maxLength: PropTypes.string,
  disableVerticalResize: PropTypes.bool,
  disableHorizontalResize: PropTypes.bool,
  'data-cy': PropTypes.string,
};
TextAreaField.defaultProps = {
  type: 'text',
  placeholder: '',
  labelClassName: '',
  label: '',
  rows: '4',
  cols: '50',
  disableVerticalResize: false,
  disableHorizontalResize: false,
};
export default TextAreaField;
