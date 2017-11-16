/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const StyleButton = ({ active, icon, style, onToggle }) => {
  const handleToggle = e => {
    e.preventDefault();
    onToggle(style);
  };
  const className = classNames(['texformat-menu-item'], {
    ' texformat-menu-item__selected': active,
  });

  return (
    <li role="presentation" className={className} onMouseDown={handleToggle}>
      {icon}
    </li>
  );
};

StyleButton.propTypes = {
  style: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
};

export default StyleButton;
