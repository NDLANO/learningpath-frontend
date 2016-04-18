import React, { PropTypes } from 'react';
import { Editor, EditorState, ContentState, Entity, Modifier, SelectionState } from 'draft-js';

const styles = {
  'TAGBOX': {
    boxSizing: 'border-box',
    border: '1px solid rgba(32, 88, 143, 1.0)',
    borderRadius: '4px'
  }
};

export default class TagsEditor extends React.Component {
  constructor(props) {
    super(props);
    let { onUpdate, lang } = props;

    this.state = {
      editorState: EditorState.createEmpty()
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.updateTags = (content) => {
      const text = content.getBlocksAsArray()[0].getText();
      let ranges = this.findEntityRanges(content);
      let tags = [];

      ranges.forEach(function (entry) {
        tags.push({
          tag: text.slice(entry.start, entry.end),
          language: lang
        });
      });

      onUpdate(tags);
    };

    this.newSelection = (start, end, blockKey) => {
      return new SelectionState({
        anchorKey: blockKey,
        anchorOffset: start,
        focusKey: blockKey,
        focusOffset: end
      });
    };

    this.findEntityRanges = (content = this.state.editorState.getCurrentContent()) => {
      let block = content.getBlocksAsArray()[0];
      let result = [];

      for (let i = 0; i < block.getText().length;) {
        let key = block.getEntityAt(i);
        if (key == null) {
          i += 1;
          continue;
        }

        let data = Entity.get(key).getData();
        result.push(data);
        i = data.end + 1;
      }
      return result;
    };

    this.findClosestTag = (pos) => this.findEntityRanges().reduce(
      function (prev, curr) { return Math.abs(pos - prev.end) < Math.abs(pos - curr.end) ? prev : curr; },
      {end: -1, start: 0}
    );

    this.applyTag = (start, end, content = this.state.editorState.getCurrentContent()) => {
      let blockKey = content.getBlocksAsArray()[0].getKey();

      // apply entity to the tag
      const entityKey = Entity.create('TAG', 'IMMUTABLE', {start: start, end: end});
      let targetRange = this.newSelection(start, end, blockKey);
      let newContentState = Modifier.applyEntity(content, targetRange, entityKey);

      // apply decorator to the tag
      return Modifier.applyInlineStyle(newContentState , targetRange, 'TAGBOX');
    };

    this.handleReturn = () => {
      const state = this.state.editorState;
      const content = state.getCurrentContent();
      const block = content.getBlocksAsArray()[0];
      const cursorPosition = state.getSelection().getEndOffset();

      // insert space after current tag
      let targetRange = this.newSelection(cursorPosition, cursorPosition, block.getKey());
      let newContentState = Modifier.insertText(content, targetRange, ' ');

      // create a new entity and apply it to the tag
      let startPos = cursorPosition == 0 ? 0 : this.findClosestTag(cursorPosition).end + 1;
      newContentState = this.applyTag(startPos, cursorPosition, newContentState);
      let newState = EditorState.push(state, newContentState, state.lastChangeType);

      // update the current state
      newState = EditorState.moveFocusToEnd(newState);
      this.onChange(newState);
      this.updateTags(newContentState);

      return true;
    };

    this.updateEditorContentStateFromText = (value) => {
      if (value.length == 0)
        return;

      let text = value.reduce(function (prev, curr) {
        return prev + curr.tag + ' ';
      }, '');
      let editorState = EditorState.createWithContent( ContentState.createFromText(text) );
      let newContentState = editorState.getCurrentContent();
      this.setState({ editorState });


      let currIdx = 0;
      value.forEach((entry) => {
        newContentState = this.applyTag(currIdx, currIdx + entry.tag.length, newContentState);
        currIdx += entry.tag.length + 1;
      });

      editorState = EditorState.push(editorState, newContentState, editorState.lastChangeType);
      this.setState({ editorState });
    };
  }

  componentWillMount() {
    this.updateEditorContentStateFromText(this.props.value);
  }

  render() {
    return (
      <div onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          placeholder="Skriv tagger her"
          ref="editor"
          handleReturn={this.handleReturn.bind(this)}
          customStyleMap={styles}
        />
      </div>
    );
  }
}

TagsEditor.propTypes = {
  lang: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};