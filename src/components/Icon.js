import React, { PropTypes } from 'react';

function Icon (props) {
  let { svgDefId } = props;

  return (
    <svg {...props} className={'icon '+props.className}>
      <use xlinkHref={'/assets/symbol-defs.svg#'+svgDefId} />
    </svg>
  );
}

Icon.propTypes = { svgDefId: PropTypes.string.isRequired };

Icon.Person = props => (<Icon {...props} className={'icon--person '+props.className} svgDefId='icon-person' />);
Icon.Today  = props => (<Icon {...props} className={'icon--today '+props.className} svgDefId='icon-today' />);
Icon.QueryBuilder = props => (<Icon {...props} className={'icon--query-builder '+props.className} svgDefId='icon-query_builder' />);
Icon.TypeText = props => (<Icon {...props} className={'icon--menu '+props.className} svgDefId='icon-menu' />);
Icon.TypeMedia = props => (<Icon {...props} className={'icon--play-circle-outline '+props.className} svgDefId='icon-play_circle_outline' />);
Icon.TypeQuiz = props => (<Icon {...props} className={'icon--contacts '+props.className} svgDefId='icon-contacts' />);
Icon.TypeTask = Icon.TypeText;
Icon.TypeSummary = Icon.TypeText;
Icon.Save = props => (<Icon {...props} className={'icon--save '+props.className} svgDefId='icon-save' />);
Icon.Add = props => (<Icon {...props} className={'icon--add-circle-outline '+props.className} svgDefId='icon-add_circle_outline' />);
Icon.Back = props => (<Icon {...props} className={'icon--arrow-back '+props.className} svgDefId='icon-arrow_back' />);
Icon.Forward = props => (<Icon {...props} className={'icon--arrow-forward '+props.className} svgDefId='icon-arrow_forward' />);
Icon.Search = props => (<Icon {...props} className={'icon--search '+props.className} svgDefId='icon-search' />);
Icon.Exit = props => (<Icon {...props} className={'icon--exit-to-app '+props.className} svgDefId='icon-exit_to_app' />);
Icon.Apps = props => (<Icon {...props} className={'icon--apps '+props.className} svgDefId='icon-apps' />);
Icon.Check = props => (<Icon {...props} className={'icon--check '+props.className} svgDefId='icon-check' />);
Icon.Clear = props => (<Icon {...props} className={'icon--clear '+props.className} svgDefId='icon-clear' />);
Icon.MoreVert = props => (<Icon {...props} svgDefId='icon-more_vert' />);
Icon.Delete = props => (<Icon {...props} className={'icon--delete ' + props.className} svgDefId='icon-delete' />);
Icon.Input = props => (<Icon {...props} className={'icon--input ' + props.className} svgDefId='icon-input' />);
Icon.Bold = props => (<Icon {...props} className={'icon--format-bold ' + props.className} svgDefId='icon-format_bold' />);
Icon.Italic = props => (<Icon {...props} className={'icon--format-italic ' + props.className} svgDefId='icon-format_italic' />);
Icon.Underline = props => (<Icon {...props} className={'icon--format-underlined ' + props.className} svgDefId='icon-format_underlined' />);
Icon.Bulleted = props => (<Icon {...props} className={'icon--format-list-bulleted ' + props.className} svgDefId='icon-format_list_bulleted' />);
Icon.Numbered = props => (<Icon {...props} className={'icon--format-list-numbered ' + props.className} svgDefId='icon-format_list_numbered' />);
Icon.Create = props => (<Icon {...props} className={'icon--create ' + props.className} svgDefId='icon-create' />);
Icon.Duration = props => (<Icon {...props} className={'icon--query-builder' + props.className} svgDefId='icon-query_builder' />);
Icon.Visibility = props => (<Icon {...props} className={'icon--remove-red-eye' + props.className} svgDefId='icon-remove_red_eye' />);
Icon.ArrowBack = props => (<Icon {...props} className={'icon--arrow-back' + props.className} svgDefId='icon-arrow_back' />);
Icon.ArrowForward = props => (<Icon {...props} className={'icon--arrow-forward' + props.className} svgDefId='icon-arrow_forward' />);



export default Icon;
