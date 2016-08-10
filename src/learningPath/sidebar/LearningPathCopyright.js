/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import isEmpty from 'lodash/isEmpty';
import Icon from '../../common/Icon';

const License = ({ copyright }) => {
  if (!copyright.license) {
    return null;
  }
  return (
    <span>
      <Icon.Copyright />
      {copyright.license.url ? <a target="_blank" rel="noopener noreferrer" href={copyright.license.url}>{copyright.license.license}</a> : copyright.license.license}
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
