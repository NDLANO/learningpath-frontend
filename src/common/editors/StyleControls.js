/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";
import StyleButton from "./StyleButton";

const STYLES = [
  { label: "Bold", style: "BOLD", isInline: true, icon: <Icon.Bold /> },
  { label: "Italic", style: "ITALIC", isInline: true, icon: <Icon.Italic /> },
  {
    label: "Underline",
    style: "UNDERLINE",
    isInline: true,
    icon: <Icon.Underline />,
  },
  {
    label: "UL",
    style: "unordered-list-item",
    isInline: false,
    icon: <Icon.Bulleted />,
  },
  {
    label: "OL",
    style: "ordered-list-item",
    isInline: false,
    icon: <Icon.Numbered />,
  },
];

const StyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

  const currentInlineStyle = editorState.getCurrentInlineStyle();

  return (
    <ul className="textformat-menu">
      {STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={(type.isInline && currentInlineStyle.has(type.style)) || (!type.isInline && type.style === blockType)}
          label={type.label}
          onToggle={type.isInline ? props.onToggleInline : props.onToggleBlock}
          style={type.style}
          icon={type.icon}
        />
      ))}
    </ul>
  );
};

StyleControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  onToggleInline: PropTypes.func.isRequired,
  onToggleBlock: PropTypes.func.isRequired,
};

export default StyleControls;
