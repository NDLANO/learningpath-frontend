import { connect } from 'react-redux';
import flow from 'lodash/flow';
import ItemTypes from './ItemTypes';

import React, { Component, PropTypes } from 'react';
import SortableLearningStep from './SortableLearningStep';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { titleI18N } from '../../util/i18nFieldFinder';
import {
  sortLearningPathSteps
} from '../../actions';

const stepTarget = {
  drop() {
  }
};
class SortableStepsContainer extends Component {

  moveLearningStep(id, atIndex, learningsteps) {
    const { step, index } = this.findLearningStep(id, learningsteps);
    const { sortSteps } = this.props;
    learningsteps.splice(index, 1);
    learningsteps.splice(atIndex, 0, step);
    sortSteps(learningsteps);
  }

  findLearningStep(id, learningsteps) {
    const step = learningsteps.find(c => c.id === id);

    return {
      step,
      index: learningsteps.indexOf(step)
    };
  }

  constructor(props) {
    super(props);
    this.moveLearningStep = this.moveLearningStep.bind(this);
    this.findLearningStep = this.findLearningStep.bind(this);
  }

  render() {

    let {lang} = this.context;
    let {learningsteps, connectDropTarget} = this.props;

    if (!learningsteps) {
      return null;
    }

    return connectDropTarget(
      <div className="step-nav step-nav_editable">
        <ul className="step-nav_list">
          {learningsteps.map((step, i) => {
            return (
              <SortableLearningStep key={step.id}
                index={i}
                pathId={this.props.learningPath.id}
                id={step.id}
                title={titleI18N(step, lang)}
                moveLearningStep={this.moveLearningStep}
                findLearningStep={this.findLearningStep}
                learningsteps={learningsteps}
                type={step.type}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}


const mapStateToProps = state => Object.assign({}, state, {
  learningsteps: state.learningPath.learningsteps
});
export const mapDispatchToProps = {
  sortSteps: sortLearningPathSteps
};
export default flow(
  DropTarget(ItemTypes.LEARNING_STEP, stepTarget, c => ({connectDropTarget: c.dropTarget()})),
  DragDropContext(HTML5Backend),
  connect(mapStateToProps, mapDispatchToProps)
)(SortableStepsContainer);

SortableStepsContainer.propTypes = {
  learningPath: PropTypes.object.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  sortSteps: PropTypes.func.isRequired,
  learningsteps: PropTypes.array.isRequired
};

SortableStepsContainer.contextTypes = {
  lang: PropTypes.string.isRequired
};
