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

export default Icon;
