/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import polyglot from '../../i18n';

const LearningPathActionType = ({ authenticated, learningPath, onCopyLearningPathClick, localCloseSidebars }) => {
  const classNames = 'cta-link cta-link--round edit_learningpath--button';
  if (learningPath.canEdit) {
    return <Link className={classNames} to={`/learningpaths/${learningPath.id}/edit`} onClick={localCloseSidebars}>{polyglot.t('editPage.edit')}</Link>;
  } else if (authenticated) {
    return <button className={classNames} onClick={onCopyLearningPathClick}>{polyglot.t('copyLearningPath.createCopy')}</button>;
  }
  return null;
};

LearningPathActionType.propTypes = {
  learningPath: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  onCopyLearningPathClick: PropTypes.func.isRequired,
  localCloseSidebars: PropTypes.func.isRequired,
};

export default LearningPathActionType;
