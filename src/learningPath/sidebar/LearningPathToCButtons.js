/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import polyglot from '../../i18n';
import { updateLearningPathStatus } from '../learningPathActions';
import { closeSidebars } from '../../common/sidebarActions';

export function LearningPathToCButtons({ learningPath, updatePathStatus, localCloseSidebars }) {
  if (!learningPath.canEdit) {
    return null;
  }

  const statuses = [{ status: 'PRIVATE', action: 'unpublish' }, { status: 'PUBLISHED', action: 'publish' }, { status: 'NOT_LISTED', action: 'unlist' }];
  const publishAction = status => (evt) => {
    evt.preventDefault();
    if (status.status !== learningPath.status) {
      updatePathStatus(learningPath.id, status.status).then(localCloseSidebars);
    }
  };

  return (
    <div className="learning-path_save-buttons">
      {statuses.filter(status => status.status !== learningPath.status).map(status =>
        <button key={status.status} className="button--primary-outline labeled-icon" onClick={publishAction}>
          {polyglot.t(`pathDropDown.${learningPath.status}.${status.action}`)}
        </button>
      )}
    </div>
  );
}

LearningPathToCButtons.propTypes = {
  learningPath: PropTypes.object.isRequired,
  updatePathStatus: PropTypes.func.isRequired,
  localCloseSidebars: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  updatePathStatus: updateLearningPathStatus,
  localCloseSidebars: closeSidebars,
};

export default connect(state => state, mapDispatchToProps)(LearningPathToCButtons);
