import React, { PropTypes } from 'react';
import OneLineEditor from './OneLineEditor';

export default function DescriptionEditor ({value, onChange}, {lang}) {
  const _onChange = (newValue) => onChange({description: newValue, language: lang});
  return (<OneLineEditor
    onChange={_onChange}
    value={value||''}
    maxlength = {155}
    placeholder='Skriv kort beskrivelse (max 155 teng)'
  />);
}

DescriptionEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

DescriptionEditor.contextTypes = {
  lang: PropTypes.string.isRequired
};
