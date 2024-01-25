/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { connect } from "react-redux";
import get from "lodash/get";
import assign from "lodash/assign";
import EditLearningPathStep, { mapStateToProps, mapDispatchToProps } from "../edit/EditLearningPathStep";
import * as actions from "../learningPathStepActions";
import ifAuthenticated from "../../../util/ifAuthenticated";

const extendMapStateToProps = (state) =>
  assign({}, mapStateToProps, {
    step: get(state, "learningPathStep", {}),
    learningPathId: state.learningPath.id,
    licenses: get(state, "learningPathLicenses.all", []),
  });

const extendMapDispatchToProps = assign({}, mapDispatchToProps, {
  localIfAuthenticated: ifAuthenticated,
  localCreateEmptyLearningPathStep: actions.createEmptyLearningPathStep,
});

export default connect(extendMapStateToProps, extendMapDispatchToProps)(EditLearningPathStep);
