/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import polyglot from '../i18n';

const IsBasedOn = ({ path, showText }) => (
  <span className="is-based-on_wrapper">
    {showText ? <span>{polyglot.t('learningPath.isBasedOn')}</span> : ''}
    {path.isBasedOnTitle ? (
      <Link
        to={`/learningpaths/${path.isBasedOn}/first-step`}
        className="cta-link--primary cta-link--underline"
        target="_blank"
        rel="noopener noreferrer">
        {path.isBasedOnTitle}
      </Link>
    ) : (
      polyglot.t('learningPath.isBasedOnPath')
    )}
  </span>
);

IsBasedOn.propTypes = {
  path: PropTypes.object.isRequired,
  showText: PropTypes.bool,
};

IsBasedOn.defaultProps = {
  showText: true,
};

export default IsBasedOn;
