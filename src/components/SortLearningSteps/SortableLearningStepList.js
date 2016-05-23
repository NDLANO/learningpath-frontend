import { connect } from 'react-redux';
import flow from 'lodash/flow';

import React, { Component, PropTypes } from 'react';
import Icon from '../Icon';
import createSortableItem from './SortableItem';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { titleI18N } from '../../util/i18nFieldFinder';
import {
  updateStepSequenceNumber,
  deleteLearningPathStep,
  sortLearningPathSteps
} from '../../actions';

class SortableLearningStepList extends Component {
  constructor(props) {
    super(props);
    this.state = {SortableItem: createSortableItem()};
    this.moveLearningStep = this.moveLearningStep.bind(this);
    this.findLearningStep = this.findLearningStep.bind(this);
  }

  moveLearningStep(id, atIndex) {
    const { learningsteps } = this.props;
    const { step, index } = this.findLearningStep(id, learningsteps);
    const { sortSteps } = this.props;
    learningsteps.splice(index, 1);
    learningsteps.splice(atIndex, 0, step);
    const updated = learningsteps.map((s, i) => Object.assign(s, { seqNo: i }));
    sortSteps(updated);
  }

  findLearningStep(id, learningsteps) {
    const step = learningsteps.find(c => c.id === id);

    return {
      step,
      index: learningsteps.indexOf(step)
    };
  }

  render() {
    const { lang } = this.context;
    const { SortableItem } = this.state;
    const { learningPathId, learningsteps, deleteStep, localUpdateStepSequenceNumber } = this.props;

    if (!learningsteps || !learningPathId) {
      return null;
    }

    return (
      <div className="sortable">
        <ul className="sortable_list">
          {learningsteps.map((step, i) =>
            (<SortableItem
              id={step.id} index={i} key={step.id} moveItem={this.moveLearningStep}
              onDrop={(id, originalIndex, newIndex) => localUpdateStepSequenceNumber(learningPathId, step.id, newIndex)}
              placeholderClassName="sortable_placeholder"
            >
              <li className="sortable_item">
                <div className="sortable_handle">
                  <Icon.ImportExport className="icon--m" />
                </div>
                <div className="sortable_title">
                  {titleI18N(step, lang)}
                </div>
                <div className="sortable_action">
                  <button onClick={() => deleteStep(learningPathId, step.id)} className="un-button">
                    <Icon.Clear className="icon--m" />
                  </button>
                </div>
              </li>
            </SortableItem>)
          )}
        </ul>
      </div>
    );
  }
}


const mapStateToProps = state => state;

export const mapDispatchToProps = {
  sortSteps: sortLearningPathSteps,
  localUpdateStepSequenceNumber: updateStepSequenceNumber,
  deleteStep: deleteLearningPathStep
};

export default flow(
  new DragDropContext(HTML5Backend),
  connect(mapStateToProps, mapDispatchToProps)
)(SortableLearningStepList);

SortableLearningStepList.propTypes = {
  sortSteps: PropTypes.func.isRequired,
  localUpdateStepSequenceNumber: PropTypes.func.isRequired,
  deleteStep: PropTypes.func.isRequired,
  learningPathId: PropTypes.number,
  learningsteps: PropTypes.array
};

SortableLearningStepList.contextTypes = {
  lang: PropTypes.string.isRequired
};
