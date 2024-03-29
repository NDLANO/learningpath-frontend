/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import polyglot from "../../i18n";
import { updateLearningPathStatus } from "../learningPathActions";
import { closeSidebars } from "../../common/sidebarActions";
import { getLearningPath } from "../learningPathSelectors";
import { learningPathStatusFromStatus } from "../learningPathUtil";

export const LearningPathToCButtons = ({ learningPath, updatePathStatus, localCloseSidebars }) => {
  if (!learningPath.canEdit) {
    return null;
  }

  const publishAction = (status) => (evt) => {
    evt.preventDefault();
    if (status.status !== learningPath.status) {
      updatePathStatus(learningPath.id, status.status).then(localCloseSidebars);
    }
  };
  const status = learningPathStatusFromStatus(learningPath.status);
  return (
    <div>
      <button
        type="button"
        key={status.status}
        className="button--primary-outline cta-link--block"
        onClick={publishAction(status)}
      >
        {polyglot.t(`pathDropDown.${learningPath.status}.${status.action}`)}
      </button>
    </div>
  );
};

LearningPathToCButtons.propTypes = {
  learningPath: PropTypes.object.isRequired,
  updatePathStatus: PropTypes.func.isRequired,
  localCloseSidebars: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>
  Object.assign({}, state, {
    learningPath: getLearningPath(state),
  });

const mapDispatchToProps = {
  updatePathStatus: updateLearningPathStatus,
  localCloseSidebars: closeSidebars,
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningPathToCButtons);
