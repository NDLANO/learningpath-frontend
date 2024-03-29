/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { Editor, EditorState, RichUtils } from "draft-js";
import classNames from "classnames";
import { convertFromHTML } from "draft-convert";
import Icon from "../Icon";
import polyglot from "../../i18n";
import StyleControls from "./StyleControls";
import { convertDraftJsToHtml } from "../../util/convertDraftJsStateToHtml";

export default class DescriptionHTMLEditor extends React.Component {
  constructor(props) {
    super(props);
    const htmlStr = props.input.value;
    const editorState =
      htmlStr && htmlStr.length > 0
        ? EditorState.createWithContent(convertFromHTML(htmlStr))
        : EditorState.createEmpty();
    this.state = { editorState, previousHasText: htmlStr.length > 0 };

    this.focus = () => this.editor.focus();
    this.blur = () => this.editor.blur();

    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDescriptionBlur = this.handleDescriptionBlur.bind(this);
  }

  componentDidMount() {
    this.setEditorContentStateFromHTML(this.props.input.value);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.input.value !== this.props.input.value) {
      return false;
    }
    return true;
  }

  setEditorContentStateFromHTML(htmlStr) {
    if (htmlStr !== undefined) {
      const contentState = convertFromHTML(htmlStr);
      const editorState = EditorState.createWithContent(contentState);
      this.handleDescriptionChange(editorState);
    }
  }

  handleDescriptionChange(editorState) {
    this.setState(
      (prevState) => ({
        editorState,
        previousHasText: prevState.editorState.getCurrentContent().hasText(),
      }),
      () => {
        const contentState = editorState.getCurrentContent();
        if (!this.state.previousHasText || !contentState.hasText()) {
          const descriptionHTML = convertDraftJsToHtml(contentState);
          this.props.input.onChange(descriptionHTML);
        }
      },
    );
  }

  handleDescriptionBlur() {
    const contentState = this.state.editorState.getCurrentContent();
    const descriptionHTML = convertDraftJsToHtml(contentState);
    this.props.onBlur(descriptionHTML);
  }

  toggleBlockType(blockType) {
    this.handleDescriptionChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  toggleInlineStyle(inlineStyle) {
    this.handleDescriptionChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }

  render() {
    const { editorState } = this.state;

    const contentState = editorState.getCurrentContent();

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    const commentAboveApplies = !contentState.hasText() && contentState.getBlockMap().first().getType() !== "unstyled";

    const className = classNames({
      "RichEditor-editor learning-step-form_input learning-step-form_paragraph": true,
      "RichEditor-hidePlaceholder": commentAboveApplies,
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
            <span className="learning-step-form_icon-bg">
              <Icon.Create />
            </span>
          </div>
          <div className="learning-step-form_right">
            {/*eslint-disable*/}
            <div className={className} onClick={this.focus}>
              {/* eslint-enable */}
              <Editor
                editorState={editorState}
                onChange={this.handleDescriptionChange}
                onBlur={this.handleDescriptionBlur}
                placeholder={this.props.placeholder}
                ref={(editor) => {
                  this.editor = editor;
                }}
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
    value: PropTypes.string.isRequired,
  }),
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
};

DescriptionHTMLEditor.defaultProps = {
  placeholder: polyglot.t("editPathStep.stepDescriptionPlaceholder"),
};
