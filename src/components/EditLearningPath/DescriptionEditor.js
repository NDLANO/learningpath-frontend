import React, { PropTypes } from 'react';
import OneLineEditor from './OneLineEditor';

export default function DescriptionEditor ({lang, value, onChange}) {
  const _onChange = (newValue) => onChange({description: newValue, language: lang});
  return (<OneLineEditor
    onChange={_onChange}
    value={value||''}
    placeholder='Skriv kort beskrivelse (max 150 teng)'
  />);
}

DescriptionEditor.propTypes = {
  value: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
