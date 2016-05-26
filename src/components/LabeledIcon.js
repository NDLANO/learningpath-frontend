import React, { PropTypes } from 'react';
import get from 'lodash/get';
import Icon from './Icon';

function LabeledIcon(props) {
  const { iconName, labelText } = props;
  const tagName = get(props, 'tagName', 'span');
  let icon = React.createElement(Icon[iconName], {className: 'icon--with-label'});
  let label = React.createElement(tagName, {className: 'labeled-icon_text'}, labelText);
  console.log(labelText);
  return (<span className="labeled-icon">{icon}{label}</span>);
}

LabeledIcon.propTypes = {
  labelText: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  tagName: PropTypes.string
};


LabeledIcon.Person = props => (<LabeledIcon {...props} iconName="Person" />);
LabeledIcon.Today = props => (<LabeledIcon {...props} iconName="Today" />);
LabeledIcon.QueryBuilder = props => (<LabeledIcon {...props} iconName="QueryBuilder" />);
LabeledIcon.Save = props => (<LabeledIcon {...props} iconName="Save" />);
LabeledIcon.Add = props => (<LabeledIcon {...props} iconName="Add" />);
LabeledIcon.Search = props => (<LabeledIcon {...props} iconName="Search" />);
LabeledIcon.Exit = props => (<LabeledIcon {...props} iconName="Exit" />);
LabeledIcon.Apps = props => (<LabeledIcon {...props} iconName="Apps" />);
LabeledIcon.Clear = props => (<LabeledIcon {...props} iconName="Clear" />);
LabeledIcon.Delete = props => (<LabeledIcon {...props} iconName="Delete" />);

export default LabeledIcon;

LabeledIcon.defaultProps = {
  labelText: ''
};
