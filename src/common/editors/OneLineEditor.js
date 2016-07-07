import React, { PropTypes } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import polyglot from '../../i18n';

export default class OneLineEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = { editorState: EditorState.createEmpty() };

    const { onChange, maxlength } = props;

    this.onChange = (editorState) => this.setState({editorState}, () => {
      if (editorState.getSelection().getHasFocus()) {
        return;
      }

      const newValue = editorState.getCurrentContent().getPlainText();

      onChange(newValue);
    });

    this.handleReturn = () => {
      this.refs.editor.blur();
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

  componentWillMount() {
    this.updateEditorContentStateFromText(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    this.updateEditorContentStateFromText(nextProps.value);
  }

  updateEditorContentStateFromText(text) {
    if (text !== undefined) {
      const editorState = EditorState.createWithContent(ContentState.createFromText(text));
      this.setState({ editorState });
    }
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        handleBeforeInput={this.handleBeforeInput}
        handlePastedText={this.handlePastedText}
        handleReturn={this.handleReturn}
        placeholder={this.props.placeholder}
        ref="editor"
      />
    );
  }
}

OneLineEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  maxlength: PropTypes.number
};

OneLineEditor.defaultProps = {
  placeholder: polyglot.t('editPage.oneLineEditorDefaultPlaceholder'),
  maxlength: -1
};
