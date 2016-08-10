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

import polyglot from '../../i18n';
import { closeSidebars } from '../../actions';

export function AddLearningPathStepButton({ learningPath, localCloseSidebars }) {
  if (!learningPath.canEdit) {
    return null;
  }

  const newStepTarget = `/learningpaths/${learningPath.id}/step/new`;

  return (
    <div className="add-learningpath-step">
      <div className="add-learningpath-step_line" />
      <Link to={newStepTarget} className="add-learningpath-step_button cta-link cta-link--block cta-link--secondary" onClick={localCloseSidebars}>
        <div className="plus-sign--circle">+</div>
        {polyglot.t('editPage.addStepBtn')}
      </Link>
    </div>
  );
}

AddLearningPathStepButton.propTypes = {
  learningPath: PropTypes.object.isRequired,
  localCloseSidebars: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  localCloseSidebars: closeSidebars,
};

export default connect(state => state, mapDispatchToProps)(AddLearningPathStepButton);