/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Icon from './Icon';

function LabeledIcon(props) {
  const { iconName, labelText } = props;
  const tagName = get(props, 'tagName', 'span');
  const icon = React.createElement(Icon[iconName], {
    className: 'icon--with-label',
  });
  const label = React.createElement(
    tagName,
    { className: 'labeled-icon_text' },
    labelText,
  );
  return (
    <span className="labeled-icon">
      {icon}
      {label}
    </span>
  );
}

LabeledIcon.propTypes = {
  labelText: PropTypes.string,
  iconName: PropTypes.string,
  tagName: PropTypes.string,
};

LabeledIcon.Person = props => <LabeledIcon {...props} iconName="Person" />;
LabeledIcon.Today = props => <LabeledIcon {...props} iconName="Today" />;
LabeledIcon.QueryBuilder = props => (
  <LabeledIcon {...props} iconName="QueryBuilder" />
);
LabeledIcon.Save = props => <LabeledIcon {...props} iconName="Save" />;
LabeledIcon.Add = props => <LabeledIcon {...props} iconName="Add" />;
LabeledIcon.Search = props => <LabeledIcon {...props} iconName="Search" />;
LabeledIcon.Exit = props => <LabeledIcon {...props} iconName="Exit" />;
LabeledIcon.Apps = props => <LabeledIcon {...props} iconName="Apps" />;
LabeledIcon.Clear = props => <LabeledIcon {...props} iconName="Clear" />;
LabeledIcon.Delete = props => <LabeledIcon {...props} iconName="Delete" />;
LabeledIcon.ContentCopy = props => (
  <LabeledIcon {...props} iconName="ContentCopy" />
);
LabeledIcon.Copyright = props => (
  <LabeledIcon {...props} iconName="Copyright" />
);
export default LabeledIcon;

LabeledIcon.defaultProps = {
  labelText: '',
};
