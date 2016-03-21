import React, { PropTypes } from 'react';
import OneLineEditor from './OneLineEditor';
import { Editor, EditorState, ContentState } from 'draft-js';

export default function TitleEditor ({value, onChange}, {lang}) {
  const _onChange = (newValue) => onChange({title: newValue, language: lang});
  return (<OneLineEditor
    onChange={_onChange}
    value={value||''}
  />);
}

TitleEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

TitleEditor.contextTypes = {
  lang: PropTypes.string.isRequired
};
