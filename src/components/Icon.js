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

export default Icon;
