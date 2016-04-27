import React, { PropTypes } from 'react';
import { Editor, EditorState, ContentState, RichUtils, convertFromHTML } from 'draft-js';
import Icon from '../Icon';
import classNames from 'classnames';
import { stateToHTML } from 'draft-js-export-html';
import polyglot from '../../i18n';

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = classNames(
        [ 'un-button', 'RichEditor-styleButton' ],
        {' RichEditor-activeButton': this.props.active}
    );

    return (
      <button className={className} onClick={this.onToggle}>
        [{this.props.label}]
      </button>
    );
  }
}

StyleButton.propTypes = {
  style: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};



const BLOCK_TYPES = [
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'}
];

const BlockStyleControls = props => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

BlockStyleControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired
};



const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'}
];

const InlineStyleControls = props => {
  let currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className='RichEditor-controls'>
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

InlineStyleControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired
};



export default class DescriptionHTMLEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};

    const { onChange } = props;

    this.focus = () => this.refs.editor.focus();
    this.blur = () => this.refs.editor.blur();
    this.onChange = editorState => this.setState({editorState}, () => {
      if (editorState.getSelection().getHasFocus()) {
        return;
      }
      let contentState = editorState.getCurrentContent();
      onChange({
        description: stateToHTML(contentState),
        language: props.lang
      });
    });

    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  _setEditorContentStateFromHTML(htmlStr) {
    if (htmlStr !== undefined) {
      let contentState = ContentState.createFromBlockArray(convertFromHTML(htmlStr));
      let editorState = EditorState.createWithContent( contentState );
      this.setState({editorState});
    }
  }

  componentWillMount() {
    this._setEditorContentStateFromHTML(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    this._setEditorContentStateFromHTML(nextProps.value);
  }

  render() {
    const { editorState } = this.state;

    let contentState = editorState.getCurrentContent();

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let commentAboveApplies = !contentState.hasText() &&
      contentState.getBlockMap().first().getType() !== 'unstyled';

    let className = classNames({
      'RichEditor-editor': true,
      'RichEditor-hidePlaceholder': commentAboveApplies
    });

    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className={className} onClick={this.focus}>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            placeholder={polyglot.t('editPathStep.stepDescriptionPlaceholder')}
            ref='editor'
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}


DescriptionHTMLEditor.propTypes = {
  lang: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
