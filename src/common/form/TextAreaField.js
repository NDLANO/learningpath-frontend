import React, { PropTypes } from 'react';


const TextAreaField = (props) => {
  const { input, rows, cols, maxLength, label, placeholder, labelClassName, type, meta: { touched, error } } = props;
  const inputClassName = touched && error ? 'textarea input--alert' : 'textarea';
  return (
    <div>
      <label className={labelClassName} htmlFor={input.name}>{label}</label>
      <textarea {...input} rows={rows} cols={cols} maxLength={maxLength} placeholder={placeholder} type={type} className={inputClassName} />
      {touched && error && <span className="error_message error_message--red">{error}</span>}
    </div>
  );
};
TextAreaField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  labelClassName: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.string,
  cols: PropTypes.string,
  maxLength: PropTypes.string,
};
TextAreaField.defaultProps = {
  type: 'text',
  placeholder: '',
  labelClassName: '',
  label: '',
  rows: '4',
  cols: '50',
};
export default TextAreaField;
