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
import { isBasedOnTitleI18N } from '../util/i18nFieldFinder';

const IsBasedOn = ({ path }, { lang }) => {
  const title = path.isBasedOnTitle ? isBasedOnTitleI18N(path, lang, true) : polyglot.t('learningPath.isBasedOnPath');
  const url = `/learningpaths/${path.isBasedOn}/first-step/`;
  return (
    <p>
      <span>{polyglot.t('learningPath.isBasedOn')}</span>
      <Link to={url} className="cta-link--primary cta-link--underline" target="_blank" rel="noopener noreferrer" >
        {title}
      </Link>
    </p>
  );
};


IsBasedOn.propTypes = {
  path: PropTypes.object.isRequired,
};

IsBasedOn.contextTypes = {
  lang: PropTypes.string.isRequired,
};
export default IsBasedOn;
