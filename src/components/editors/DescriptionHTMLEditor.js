import React, { PropTypes } from 'react';
import { Editor, EditorState, ContentState, RichUtils, convertFromHTML } from 'draft-js';
import Icon from '../Icon';
import classNames from 'classnames';
import { stateToHTML } from 'draft-js-export-html';
import polyglot from '../../i18n';

const StyleButton = ({ active, icon, style, onToggle }) => {
  const handleToggle = e => {
    e.preventDefault();
    onToggle(style);
  };
  const className = classNames(
      ['texformat-menu-item'],
      {' texformat-menu-item__selected': active}
  );

  return (
    <li className={className} onMouseDown={handleToggle}>
      {icon}
    </li>
  );
};

StyleButton.propTypes = {
  style: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired
};

const STYLES = [
  {label: 'Bold', style: 'BOLD', isInline: true, icon: <Icon.Bold />},
  {label: 'Italic', style: 'ITALIC', isInline: true, icon: <Icon.Italic />},
  {label: 'Underline', style: 'UNDERLINE', isInline: true, icon: <Icon.Underline />},
  {label: 'UL', style: 'unordered-list-item', isInline: false, icon: <Icon.Bulleted />},
  {label: 'OL', style: 'ordered-list-item', isInline: false, icon: <Icon.Numbered />}
];

const StyleControls = props => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

  const currentInlineStyle = editorState.getCurrentInlineStyle();

  return (
    <ul className="textformat-menu">
      {STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={(type.isInline && currentInlineStyle.has(type.style)) || (!type.isInline && type.style === blockType)}
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
      const contentState = editorState.getCurrentContent();
      onChange(stateToHTML(contentState));
    });

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
  }

  componentWillMount() {
    this.setEditorContentStateFromHTML(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    this.setEditorContentStateFromHTML(nextProps.value);
  }

  setEditorContentStateFromHTML(htmlStr) {
    if (htmlStr !== undefined) {
      const contentState = ContentState.createFromBlockArray(convertFromHTML(htmlStr));
      const editorState = EditorState.createWithContent(contentState);
      this.setState({editorState});
    }
  }

  toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  render() {
    const { editorState } = this.state;

    const contentState = editorState.getCurrentContent();

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    const commentAboveApplies = !contentState.hasText() &&
      contentState.getBlockMap().first().getType() !== 'unstyled';

    let className = classNames({
      'RichEditor-editor learning-step-form_input learning-step-form_paragraph': true,
      'RichEditor-hidePlaceholder': commentAboveApplies
    });

    return (
      <div className="RichEditor-root">
        <div className="learning-step-form_group">
          <StyleControls
            editorState={editorState}
            onToggleInline={this.toggleInlineStyle}
            onToggleBlock={this.toggleBlockType}
          />
        </div>
        <div className="learning-step-form_group">
          <div className="learning-step-form_left">
            <span className="learning-step-form_icon-bg"><Icon.Create /></span>
          </div>
          <div className="learning-step-form_right">
            <div className={className} onClick={this.focus}>
              <Editor
                editorState={editorState}
                onChange={this.onChange}
                placeholder={this.props.placeholder}
                ref="editor"
                spellCheck
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


DescriptionHTMLEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

DescriptionHTMLEditor.defaultProps = {
  placeholder: polyglot.t('editPathStep.stepDescriptionPlaceholder')
};
