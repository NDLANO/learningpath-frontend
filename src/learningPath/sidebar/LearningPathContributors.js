/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Icon from '../../common/Icon';

const LearningPathContributors = ({ copyright }) => {
  if (
    !copyright ||
    !copyright.contributors ||
    isEmpty(copyright.contributors)
  ) {
    return null;
  }
  return (
    <span>
      <Icon.Person />
      {copyright.contributors.map(contributor => contributor.name).join(', ')}
    </span>
  );
};
LearningPathContributors.propTypes = {
  copyright: PropTypes.object,
};

export default LearningPathContributors;
