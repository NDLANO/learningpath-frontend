/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import Icon from '../../common/Icon';
import LabeledIcon from '../../common/LabeledIcon';

const License = ({ copyright }) => {
  if (!copyright.license) {
    return null;
  }
  return (
    <span>
      {copyright.license.url ?
        <Link to={copyright.license.url} rel="noopener noreferrer" target="_blank"><LabeledIcon.Copyright tagName="copyright" labelText={copyright.license.license} /></Link> : ''}
    </span>
  );
};
License.propTypes = {
  copyright: PropTypes.object.isRequired,
};

const Contributors = ({ copyright }) => {
  if (!copyright.contributors || isEmpty(copyright.contributors)) {
    return null;
  }
  return (
    <span>
      <Icon.Person />
      {copyright.contributors.map((contributor) =>
        contributor.name
      ).join(', ')}
    </span>
  );
};
Contributors.propTypes = {
  copyright: PropTypes.object.isRequired,
};


export default function LearningPathCopyright({ copyright }) {
  if (!copyright) {
    return null;
  }
  return (
    <div className="learningpath-copyright">
      <div className="learningpath-contributors">
        <Contributors copyright={copyright} />
      </div>
      <div className="learningpath-license">
        <License copyright={copyright} />
      </div>
    </div>
  );
}
LearningPathCopyright.propTypes = {
  copyright: PropTypes.object,
};
