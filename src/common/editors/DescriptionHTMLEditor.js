/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, RichUtils } from 'draft-js';
import classNames from 'classnames';
import { convertFromHTML } from 'draft-convert';
import Icon from '../Icon';
import polyglot from '../../i18n';
import StyleControls from './StyleControls';
import { convertDraftJsToHtml } from '../../util/convertDraftJsStateToHtml';

export default class DescriptionHTMLEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };

    const { input } = props;

    this.focus = () => this.editor.focus();
    this.blur = () => this.editor.blur();
    this.onChange = editorState => this.setState({ editorState }, () => {
      const contentState = editorState.getCurrentContent();
      input.onChange(contentState);
    });

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
  }

  componentWillMount() {
    if (typeof this.props.input.value === 'string') {
      this.setEditorContentStateFromHTML(this.props.input.value);
    }
  }

  /* componentWillReceiveProps(nextProps) {
    if (typeof nextProps.input.value === 'string') {
      this.setEditorContentStateFromHTML(nextProps.input.value);
    }
  }*/

  setEditorContentStateFromHTML(htmlStr) {
    if (htmlStr !== undefined) {
      const contentState = convertFromHTML(htmlStr);
      const editorState = EditorState.createWithContent(contentState);
      this.onChange(editorState);
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

    const onBlur = () => {
      this.props.input.onBlur(contentState);
      this.props.onBlur(contentState, this.props.input.onBlur);
    };

    const className = classNames({
      'RichEditor-editor learning-step-form_input learning-step-form_paragraph': true,
      'RichEditor-hidePlaceholder': commentAboveApplies,
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
            {/*eslint-disable*/}
            <div className={className} onClick={this.focus}>
              {/*eslint-enable*/}
              <Editor
                editorState={editorState}
                onChange={this.onChange}
                onBlur={onBlur}
                placeholder={this.props.placeholder}
                ref={(editor) => { this.editor = editor; }}
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

  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  }),
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
};

DescriptionHTMLEditor.defaultProps = {
  placeholder: polyglot.t('editPathStep.stepDescriptionPlaceholder'),
};
