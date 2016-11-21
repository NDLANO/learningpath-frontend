/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const IsBasedOn = ({ url, className, title }) => (
  <p>
    <span>basert på </span>
    <Link to={url} className={className} target="_blank" rel="noopener noreferrer" >
      {title}
    </Link>
  </p>
);


IsBasedOn.propTypes = {
  url: PropTypes.string.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
};

export default IsBasedOn;
