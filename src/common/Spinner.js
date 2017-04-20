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

const Spinner = ({ hasMargins }) => {
  const classes = classNames(
    'spinner',
    {
      'spinner--margins': hasMargins,
    }
  );
  return <div className={classes} />;
};

Spinner.propTypes = {
  hasMargins: PropTypes.bool,
};

Spinner.defaultProps = {
  hasMargins: undefined,
};

export default Spinner;
