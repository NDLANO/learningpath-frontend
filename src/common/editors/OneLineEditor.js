/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, ContentState} from 'draft-js';
import polyglot from '../../i18n';

export default class OneLineEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = { editorState: EditorState.createEmpty() };

    const { input: { onChange }, maxlength } = props;

    this.onChange = editorState => this.setState({ editorState }, () => {
      const newValue = editorState.getCurrentContent().getPlainText();
      onChange(newValue);
    });

    this.handleReturn = () => {
      this.editor.blur();
      return true;
    };
    this.handleReturn = this.handleReturn.bind(this);

    this.handleBeforeInput = () => false;

    if (maxlength >= 0) {
      this.handleBeforeInput = () => {
        const plainText = this.state.editorState.getCurrentContent().getPlainText();
        return plainText.length >= maxlength;
      };
    }

    /* TODO implement this when Editor.handlePastedText lands in draft-js@latest */
    this.handlePastedText = (text, html) => false; // eslint-disable-line no-unused-vars
  }

  componentDidMount() {
    if (!this.state.editorState.getSelection().getHasFocus()) {
      this.updateEditorContentStateFromText(this.props.input.value);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.state.editorState.getSelection().getHasFocus() && nextProps.input.value !== this.props.input.value) {
      this.updateEditorContentStateFromText(nextProps.input.value);
    }
  }

  updateEditorContentStateFromText(text) {

    if (text !== undefined) {
      const editorState = EditorState.createWithContent(ContentState.createFromText(text));
      this.setState({ editorState });
    }
  }

  render() {
    const { placeholder, meta, wrapperClassName, input: { onBlur } } = this.props;
    return (
      <div>
        <div className={wrapperClassName}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            onBlur={onBlur}
            handleBeforeInput={this.handleBeforeInput}
            handlePastedText={this.handlePastedText}
            handleReturn={this.handleReturn}
            placeholder={placeholder}
            ref={(editor) => { this.editor = editor; }}
          />
        </div>
        {meta.touched && meta.error && <span className="error_message error_message--red">{meta.error}</span>}
      </div>
    );
  }
}

OneLineEditor.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  placeholder: PropTypes.string,
  maxlength: PropTypes.number,
  meta: PropTypes.object.isRequired,
  wrapperClassName: PropTypes.string.isRequired,
};

OneLineEditor.defaultProps = {
  placeholder: polyglot.t('editPage.oneLineEditorDefaultPlaceholder'),
  maxlength: -1,
  wrapperClassName: '',
};
