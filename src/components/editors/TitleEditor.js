import React, { PropTypes } from 'react';
import OneLineEditor from './OneLineEditor';

export default function TitleEditor ({value, onChange, placeholder, lang}) {
  const _onChange = (newValue) => onChange({title: newValue, language: lang});
  return (
    <OneLineEditor
    onChange={_onChange}
    value={value||''}
    placeholder={placeholder}
    />);
}

TitleEditor.propTypes = {
  value: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

TitleEditor.defaultProps = {
  placeholder: ''
};