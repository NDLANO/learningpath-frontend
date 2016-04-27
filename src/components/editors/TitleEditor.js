import React, { PropTypes } from 'react';
import OneLineEditor from './OneLineEditor';

export default function TitleEditor ({value, onChange, lang}) {
  const _onChange = (newValue) => onChange({title: newValue, language: lang});
  return (<OneLineEditor
    onChange={_onChange}
    value={value||''}
  />);
}

TitleEditor.propTypes = {
  value: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
