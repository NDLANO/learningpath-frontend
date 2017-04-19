/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';

const Spinner = ({ margins }) => {
  const classes = classNames(
    'spinner',
    {
      'spinner--margins': margins,
    }
  );
  return <div className={classes} />;
};

Spinner.propTypes = {
  margins: PropTypes.bool,
};

Spinner.defaultProps = {
  margins: undefined,
};

export default Spinner;
