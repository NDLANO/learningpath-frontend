import React, { PropTypes } from 'react';


const InputField = ({ input, label, placeholder, labelClassName, type, meta: { touched, error } }) => {
  const inputClassName = touched && error ? 'input--alert' : '';
  return (
    <div>
      <label className={labelClassName} htmlFor={input.name}>{label}</label>
      <input {...input} placeholder={placeholder} type={type} className={inputClassName} />
      {touched && error && <span className="error_message error_message--red">{error}</span>}
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
};
InputField.defaultProps = {
  type: 'text',
  placeholder: '',
  labelClassName: '',
};
export default InputField;
