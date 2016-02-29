import React, { PropTypes } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';

export default class DescriptionEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = { editorState: EditorState.createEmpty() };

    let { onChange } = props;

    this.onChange = (editorState) => this.setState({editorState}, () => {
      if (editorState.getSelection().getHasFocus()) {
        return;
      }

      let { lang } = this.props;
      let newDescriptionText = editorState.getCurrentContent().getPlainText();

      onChange({
        description: newDescriptionText,
        language: lang
      });
    });
  }

  updateEditorContentStateFromText(text) {
    if (text !== undefined) {
      let editorState = EditorState.createWithContent( ContentState.createFromText(text) );
      this.setState({ editorState });
    }
  }

  componentWillMount() {
    this.updateEditorContentStateFromText(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    this.updateEditorContentStateFromText(nextProps.value);
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        placeholder='Skriv her'
        ref='editor'
      />
    );
  }
}

DescriptionEditor.propTypes = {
  value: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
