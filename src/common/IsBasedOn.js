/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import LabeledIcon from './LabeledIcon';
import polyglot from '../i18n';

const IsBasedOn = ({ url, className }) => (
  <Link to={url} className={className} target="_blank" rel="noopener noreferrer" >
    <LabeledIcon.ContentCopy labelText={polyglot.t('learningPath.copy')} tagName="copy" />
  </Link>
);


IsBasedOn.propTypes = {
  url: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default IsBasedOn;
