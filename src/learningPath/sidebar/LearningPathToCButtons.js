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
import Icon from '../../common/Icon';
import { updateLearningPath, updateLearningPathStatus } from '../learningPathActions';
import { closeSidebars } from '../../common/sidebarActions';

export function LearningPathToCButtons({ learningPath, saveAction, saveAndPublishAction, localCloseSidebars }) {
  if (!learningPath.canEdit) {
    return null;
  }


  const onClickSaveLearningPath = () => {
    saveAction(learningPath).then(localCloseSidebars);
  };
  const onClickSaveAndPublishLearningPath = () => {
    saveAndPublishAction(learningPath).then(localCloseSidebars);
  };

  return (
    <div className="learning-path_save-buttons">
      <button className="button--primary-outline labeled-icon" onClick={onClickSaveLearningPath}>
        <Icon.Save /> {polyglot.t('editPage.saveDraft')}
      </button>
      <button className="button--primary-outline labeled-icon" onClick={onClickSaveAndPublishLearningPath}>
        {polyglot.t('editPage.publish')} <Icon.Forward />
      </button>
    </div>
  );
}

LearningPathToCButtons.propTypes = {
  learningPath: PropTypes.object.isRequired,
  saveAction: PropTypes.func.isRequired,
  saveAndPublishAction: PropTypes.func.isRequired,
  localCloseSidebars: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  saveAction: lp => updateLearningPath(lp.id, lp, '/minside'),
  saveAndPublishAction: lp => updateLearningPathStatus(lp.id, 'PUBLISHED', '/minside'),
  localCloseSidebars: closeSidebars,

};

export default connect(state => state, mapDispatchToProps)(LearningPathToCButtons);
