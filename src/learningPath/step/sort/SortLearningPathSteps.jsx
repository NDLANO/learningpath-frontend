/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  arrayMove,
} from 'react-sortable-hoc';
import { connect } from 'react-redux';
import SortableLearningStepList from './SortableLearningStepList';
import { getLearningPath } from '../../learningPathSelectors';
import { updateStepSequenceNumber, deleteLearningPathStep, sortLearningPathSteps } from '../learningPathStepActions';

class SortLearningPathSteps extends Component {

  onSortEnd = (indexes) => {
    const { sortSteps, localUpdateStepSequenceNumber, learningPath } = this.props;
    const learningsteps = learningPath.learningsteps;

    const step = learningsteps[indexes.oldIndex];

    if (step && (indexes.oldIndex !== indexes.newIndex)) {
      sortSteps(arrayMove(learningsteps, indexes.oldIndex, indexes.newIndex));
      localUpdateStepSequenceNumber(learningPath.id, step.id, indexes.newIndex);
    }
  }
  shouldCancelStart = (e) => {
    // Iterates through each target from an event on click to check if it was button click or not. Cancels drag action if it was a click on a button.
    for (let target = e.target; target !== this.contentDiv; target = target.parentElement) {
      if (target && target.tagName.toLowerCase() === 'button') {
        return true;
      }
    }
    return false;
  }

  render() {
    const { learningPath, lang, deleteStep } = this.props;
    return (
      <div ref={((contentDiv) => { this.contentDiv = contentDiv; })}>
        {(learningPath && learningPath.learningsteps && learningPath.id) ?
          <SortableLearningStepList
            learningPathId={learningPath.id}
            learningsteps={learningPath.learningsteps}
            onSortEnd={this.onSortEnd}
            lang={lang}
            shouldCancelStart={this.shouldCancelStart}
            deleteStep={deleteStep}
            pressDelay={200}
          /> : null}
      </div>
    );
  }
}


SortLearningPathSteps.propTypes = {
  learningPath: PropTypes.object.isRequired,
  localUpdateStepSequenceNumber: PropTypes.func.isRequired,
  deleteStep: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  sortSteps: PropTypes.func.isRequired,
};

const mapStateToProps = state => Object.assign({}, state, {
  learningPath: getLearningPath(state),
});

const mapDispatchToProps = {
  localUpdateStepSequenceNumber: updateStepSequenceNumber,
  deleteStep: deleteLearningPathStep,
  sortSteps: sortLearningPathSteps,
};

export default connect(mapStateToProps, mapDispatchToProps)(SortLearningPathSteps);
