import React, { PropTypes } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';

export default class OneLineEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = { editorState: EditorState.createEmpty() };

    let { onChange } = props;

    this.onChange = (editorState) => this.setState({editorState}, () => {
      if (editorState.getSelection().getHasFocus()) {
        return;
      }

      let newValue = editorState.getCurrentContent().getPlainText();

      onChange(newValue);
    });

    this.handleReturn = () => {
      this.refs.editor.blur();
      return true;
    };
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
        handleReturn={this.handleReturn.bind(this)}
        placeholder={this.props.placeholder}
        ref='editor'
      />
    );
  }
}

OneLineEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

OneLineEditor.defaultProps = {
  placeholder: 'Skriv her'
};
