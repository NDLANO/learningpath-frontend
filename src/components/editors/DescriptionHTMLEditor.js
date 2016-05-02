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
        [ 'texformat-menu-item' ],
        {' texformat-menu-item__selected': this.props.active}
    );

    return (
      <li className={className} onMouseDown={this.onToggle}>
        {this.props.icon}
      </li>
    );
  }
}

StyleButton.propTypes = {
  style: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired
};

const STYLES = [
  {label: 'Bold', style: 'BOLD', isInline: true, icon: <Icon.Bold />},
  {label: 'Italic', style: 'ITALIC', isInline: true, icon: <Icon.Italic />},
  {label: 'Underline', style: 'UNDERLINE', isInline: true ,icon: <Icon.Underline />},
  {label: 'UL', style: 'unordered-list-item', isInline: false, icon: <Icon.Bulleted />},
  {label: 'OL', style: 'ordered-list-item', isInline: false, icon: <Icon.Numbered />}
];

const StyleControls = props => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

  let currentInlineStyle = editorState.getCurrentInlineStyle();

  return (
    <ul className='textformat-menu'>
      {STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={(type.isInline && currentInlineStyle.has(type.style)) || (!type.isInline && type.style == blockType)}
          label={type.label}
          onToggle={type.isInline ? props.onToggleInline : props.onToggleBlock}
          style={type.style}
          icon={type.icon}
        />
      )}
    </ul>
  );
};

StyleControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  onToggleInline: PropTypes.func.isRequired,
  onToggleBlock: PropTypes.func.isRequired
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
        <StyleControls
          editorState={editorState}
          onToggleInline={this.toggleInlineStyle}
          onToggleBlock={this.toggleBlockType}
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
