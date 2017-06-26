/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from '../../../common/Icon';
import polyglot from '../../../i18n';

export function SortLearningStepsSaveButton({ learningPath }) {
  if (!learningPath.canEdit) {
    return null;
  }

  return (
    <div>
      <Link className="sort-steps_button_save" to={`/learningpaths/${learningPath.id}`}>
        <Icon.Save />
        {polyglot.t('sortSteps.finish')}
      </Link>
    </div>
  );
}

SortLearningStepsSaveButton.propTypes = {
  learningPath: PropTypes.object.isRequired,
};

export default connect(state => state)(SortLearningStepsSaveButton);
