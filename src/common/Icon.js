/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';

function Icon(props) {
  const { svgDefId, ...rest } = props;

  return (
    <svg {...rest} className={classNames('icon', props.className)}>
      <use xlinkHref={`/assets/${window.assets['symbol-defs.svg']}#${svgDefId}`} />
    </svg>
  );
}

Icon.propTypes = { svgDefId: PropTypes.string.isRequired };

Icon.Person = props => (<Icon {...props} className={classNames('icon--person', props.className)} svgDefId="icon-person" />);
Icon.Today = props => (<Icon {...props} className={classNames('icon--today', props.className)} svgDefId="icon-today" />);
Icon.QueryBuilder = props => (<Icon {...props} className={classNames('icon--query-builder', props.className)} svgDefId="icon-query_builder" />);
Icon.TypeText = props => (<Icon {...props} className={classNames('icon--menu', props.className)} svgDefId="icon-menu" />);
Icon.TypeMedia = props => (<Icon {...props} className={classNames('icon--play-circle-outline', props.className)} svgDefId="icon-play_circle_outline" />);
Icon.TypeQuiz = props => (<Icon {...props} className={classNames('icon--contacts', props.className)} svgDefId="icon-contacts" />);
Icon.TypeTask = Icon.TypeText;
Icon.TypeSummary = Icon.TypeText;

Icon.Save = props => (<Icon {...props} className={classNames('icon--save', props.className)} svgDefId="icon-save" />);
Icon.Add = props => (<Icon {...props} className={classNames('icon--add-circle-outline', props.className)} svgDefId="icon-add_circle_outline" />);
Icon.Back = props => (<Icon {...props} className={classNames('icon--arrow-back', props.className)} svgDefId="icon-arrow_back" />);
Icon.Forward = props => (<Icon {...props} className={classNames('icon--arrow-forward', props.className)} svgDefId="icon-arrow_forward" />);
Icon.Search = props => (<Icon {...props} className={classNames('icon--search', props.className)} svgDefId="icon-search" />);
Icon.Exit = props => (<Icon {...props} className={classNames('icon--exit-to-app', props.className)} svgDefId="icon-exit_to_app" />);
Icon.Apps = props => (<Icon {...props} className={classNames('icon--apps', props.className)} svgDefId="icon-apps" />);
Icon.Check = props => (<Icon {...props} className={classNames('icon--check', props.className)} svgDefId="icon-check" />);
Icon.Clear = props => (<Icon {...props} className={classNames('icon--clear', props.className)} svgDefId="icon-clear" />);
Icon.MoreVert = props => (<Icon {...props} svgDefId="icon-more_vert" />);
Icon.Delete = props => (<Icon {...props} className={classNames('icon--delete', props.className)} svgDefId="icon-delete" />);
Icon.Input = props => (<Icon {...props} className={classNames('icon--input', props.className)} svgDefId="icon-input" />);
Icon.Bold = props => (<Icon {...props} className={classNames('icon--format-bold', props.className)} svgDefId="icon-format_bold" />);
Icon.Italic = props => (<Icon {...props} className={classNames('icon--format-italic', props.className)} svgDefId="icon-format_italic" />);
Icon.Underline = props => (<Icon {...props} className={classNames('icon--format-underlined', props.className)} svgDefId="icon-format_underlined" />);
Icon.Bulleted = props => (<Icon {...props} className={classNames('icon--format-list-bulleted', props.className)} svgDefId="icon-format_list_bulleted" />);
Icon.Numbered = props => (<Icon {...props} className={classNames('icon--format-list-numbered', props.className)} svgDefId="icon-format_list_numbered" />);
Icon.Create = props => (<Icon {...props} className={classNames('icon--create', props.className)} svgDefId="icon-create" />);
Icon.Duration = props => (<Icon {...props} className={classNames('icon--query-builder', props.className)} svgDefId="icon-query_builder" />);
Icon.Visibility = props => (<Icon {...props} className={classNames('icon--remove-red-eye', props.className)} svgDefId="icon-remove_red_eye" />);
Icon.VisibilityOff = props => (<Icon {...props} className={classNames('icon--visibility-off', props.className)} svgDefId="icon-visibility_off" />);
Icon.ArrowBack = props => (<Icon {...props} className={classNames('icon--arrow-back', props.className)} svgDefId="icon-arrow_back" />);
Icon.ArrowForward = props => (<Icon {...props} className={classNames('icon--arrow-forward', props.className)} svgDefId="icon-arrow_forward" />);
Icon.ImportExport = props => (<Icon {...props} className={classNames('icon--import_export', props.className)} svgDefId="icon-import_export" />);
Icon.Menu = props => (<Icon {...props} className={classNames('icon--menu', props.className)} svgDefId="icon-menu" />);
Icon.RemoveRedEye = props => (<Icon {...props} className={classNames('icon--remove-red-eye', props.className)} svgDefId="icon-remove_red_eye" />);
Icon.ContentCopy = props => (<Icon {...props} className={classNames('icon--content_copy', props.className)} svgDefId="icon-content_copy" />);
Icon.ArrowUp = props => (<Icon {...props} className={classNames('icon--keyboard-arrow-up', props.className)} svgDefId="icon-keyboard_arrow_up" />);
Icon.ArrowDown = props => (<Icon {...props} className={classNames('icon--keyboard-arrow-down', props.className)} svgDefId="icon-keyboard_arrow_down" />);
Icon.Copyright = props => (<Icon {...props} className={classNames('icon--copyright', props.className)} svgDefId="icon-copyright" />);
export default Icon;
