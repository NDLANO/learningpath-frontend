/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import PropTypes from 'prop-types';

export const CopyrightObjectShape = PropTypes.shape({
  contributors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
    }),
  ),
  license: PropTypes.shape({
    description: PropTypes.string,
    license: PropTypes.string,
    url: PropTypes.string,
  }),
});

export const LocationShape = PropTypes.shape({
  pathname: PropTypes.string,
  hash: PropTypes.string,
  search: PropTypes.string,
});
