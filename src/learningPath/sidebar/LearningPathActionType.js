/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import polyglot from '../../i18n';

const LearningPathActionType = ({
  authenticated,
  learningPath,
  onCopyLearningPathClick,
  localCloseSidebars,
  hasChangeStatusButton,
}) => {
  const buttonClassName = classNames({
    'cta-link cta-link--primary-outline cta-link--block': true,
    'learningpath-action-type_button': hasChangeStatusButton,
  });
  return (
    <React.Fragment>
      {learningPath.canEdit && (
        <Link
          className={buttonClassName}
          to={`/learningpaths/${learningPath.id}/edit`}
          onClick={() => localCloseSidebars()}>
          {polyglot.t('editPage.edit')}
        </Link>
      )}
      {authenticated && (
        <button
          type="button"
          className="cta-link cta-link--primary-outline cta-link--block copy-learningpath_button"
          onClick={onCopyLearningPathClick}>
          {polyglot.t('copyLearningPath.createCopy')}
        </button>
      )}
    </React.Fragment>
  );
};

LearningPathActionType.propTypes = {
  learningPath: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  onCopyLearningPathClick: PropTypes.func.isRequired,
  localCloseSidebars: PropTypes.func.isRequired,
  hasChangeStatusButton: PropTypes.bool.isRequired,
};

export default LearningPathActionType;
