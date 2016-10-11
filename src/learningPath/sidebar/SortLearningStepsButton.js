/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Icon from '../../common/Icon';
import polyglot from '../../i18n';
import LearningPathPintrest from './LearningPathPintrest';

export function SortLearningStepsButton({ learningPath }) {
  if (!learningPath.canEdit) {
    return null;
  }

  const target = `/learningpaths/${learningPath.id}/step/sort`;

  return (
    <div>
      <Link className="sort-steps_button" to={target}>
        <Icon.ImportExport />
        {polyglot.t('sortSteps.sortOrDelete')}
      </Link>
      <ul className="vertical-menu">
        <li className="vertical-menu_item">
          <LearningPathPintrest />
        </li>
      </ul>
    </div>
  );
}

SortLearningStepsButton.propTypes = {
  learningPath: PropTypes.object.isRequired,
};

export default connect(state => state)(SortLearningStepsButton);
