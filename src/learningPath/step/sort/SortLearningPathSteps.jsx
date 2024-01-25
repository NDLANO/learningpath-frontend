/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { arrayMove } from "react-sortable-hoc";
import { connect } from "react-redux";
import { HelmetWithTracker } from "@ndla/tracker";
import SortableLearningStepList from "./SortableLearningStepList";
import { getLearningPath } from "../../learningPathSelectors";
import { updateStepSequenceNumber, deleteLearningPathStep, sortLearningPathSteps } from "../learningPathStepActions";
import polyglot from "../../../i18n";

class SortLearningPathSteps extends Component {
  constructor() {
    super();
    this.state = { learningsteps: [] };
  }

  componentDidMount() {
    if (this.props.learningPath) {
      this.setState({ learningsteps: this.props.learningPath.learningsteps });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { learningPath } = this.props;
    const { learningPath: nextLearningPath } = nextProps;
    if (
      learningPath &&
      nextLearningPath &&
      learningPath.learningsteps.length !== nextLearningPath.learningsteps.length
    ) {
      this.setState({ learningsteps: nextLearningPath.learningsteps });
    }
  }

  onSortEnd = (indexes) => {
    const { sortSteps, localUpdateStepSequenceNumber, learningPath } = this.props;
    const { learningsteps } = learningPath;
    const step = learningsteps[indexes.oldIndex];

    if (step && indexes.oldIndex !== indexes.newIndex) {
      const sorted = arrayMove(learningsteps, indexes.oldIndex, indexes.newIndex);
      this.setState({ learningsteps: sorted });
      sortSteps(sorted);
      localUpdateStepSequenceNumber(learningPath.id, step.id, indexes.newIndex);
    }
  };

  shouldCancelStart = (e) => {
    // Iterates through each target from an event on click to check if it was button click or not. Cancels drag action if it was a click on a button.
    for (let { target } = e; target !== this.contentDiv; target = target.parentElement) {
      if (target && target.tagName.toLowerCase() === "button") {
        return true;
      }
    }
    return false;
  };

  render() {
    const { learningPath, deleteStep } = this.props;
    return (
      <div
        ref={(contentDiv) => {
          this.contentDiv = contentDiv;
        }}
      >
        <HelmetWithTracker title={polyglot.t("htmlTitles.sortLearningPathSteps")} />
        {learningPath && learningPath.learningsteps && learningPath.id ? (
          <SortableLearningStepList
            learningPathId={learningPath.id}
            learningsteps={this.state.learningsteps}
            onSortEnd={this.onSortEnd}
            shouldCancelStart={this.shouldCancelStart}
            deleteStep={deleteStep}
          />
        ) : null}
      </div>
    );
  }
}

SortLearningPathSteps.propTypes = {
  learningPath: PropTypes.object.isRequired,
  localUpdateStepSequenceNumber: PropTypes.func.isRequired,
  deleteStep: PropTypes.func.isRequired,
  sortSteps: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>
  Object.assign({}, state, {
    learningPath: getLearningPath(state),
  });

const mapDispatchToProps = {
  localUpdateStepSequenceNumber: updateStepSequenceNumber,
  deleteStep: deleteLearningPathStep,
  sortSteps: sortLearningPathSteps,
};

export default connect(mapStateToProps, mapDispatchToProps)(SortLearningPathSteps);
