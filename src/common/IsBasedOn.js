/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import polyglot from '../i18n';

const IsBasedOn = ({ path }) => {
  const title = path.isBasedOnTitle ? path.isBasedOnTitle : polyglot.t('learningPath.isBasedOnPath');
  const url = `/learningpaths/${path.isBasedOn}/first-step/`;
  return (
    <span className="is-based-on_wrapper">
      <span>{polyglot.t('learningPath.isBasedOn')}</span>
      <Link to={url} className="cta-link--primary cta-link--underline" target="_blank" rel="noopener noreferrer" >
        {title}
      </Link>
    </span>
  );
};

IsBasedOn.propTypes = {
  path: PropTypes.object.isRequired,
};

export default IsBasedOn;
