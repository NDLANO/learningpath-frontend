import React, { PropTypes } from 'react';
import OneLineEditor from './OneLineEditor';
import polyglot from '../../i18n';

export default function DescriptionEditor({value, onChange, lang}) {
  const handleChange = (newValue) => onChange({description: newValue, language: lang});
  return (<div>
    <OneLineEditor
      onChange={handleChange}
      value={value || ''}
      maxlength={150}
      placeholder={polyglot.t('editPage.shortDescriptionPlaceholder')}
    />
    <div className="editor_input-underline"></div>
  </div>);
}

DescriptionEditor.propTypes = {
  value: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
