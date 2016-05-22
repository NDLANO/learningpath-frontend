import { connect } from 'react-redux';

import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import {
  updateStepSequenceNumber
} from '../../actions';
import LearningPathStepIcon from '../LearningPathStepIcon';

const stepSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findLearningStep(props.id, props.learningsteps).index
    };
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();
    if (!didDrop) {
      props.moveLearningStep(droppedId, originalIndex, props.learningsteps);
    }
    else {
      const newIndex = props.findLearningStep(props.id, props.learningsteps).index;
      newIndex === originalIndex ? '' : props.updateSeqNo(props.pathId, props.id, newIndex);
    }
  }
};

const stepTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId, learningsteps } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findLearningStep(overId, learningsteps);
      props.moveLearningStep(draggedId, overIndex, learningsteps);
    }
  }
};

class SortableLearningStep extends Component {

  render() {
    const { title, isDragging, connectDragSource, connectDropTarget, type } = this.props;
    const opacity = isDragging ? 0 : 1;
    const step = {type: ''};
    return connectDragSource(connectDropTarget(
      <li className="step-nav_item">
        <a className="step-nav_link" style={{ opacity }}>
          <div className="step-nav_line" />
          <LearningPathStepIcon learningPathStepType={type} />
          <div className="step-nav_title">
            {title}
          </div>
        </a>
      </li>
    ));
  }
}

export const mapDispatchToProps = {
  updateSeqNo: updateStepSequenceNumber
};
const mapStateToProps = state => state;


export default flow(
  DropTarget(ItemTypes.LEARNING_STEP, stepTarget, c => ({connectDropTarget: c.dropTarget()})),
  DragSource(ItemTypes.LEARNING_STEP, stepSource, (c, monitor) => ({connectDragSource: c.dragSource(), isDragging: monitor.isDragging()})),
  connect(mapStateToProps, mapDispatchToProps)
)(SortableLearningStep);


SortableLearningStep.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  moveLearningStep: PropTypes.func.isRequired,
  findLearningStep: PropTypes.func.isRequired,
  learningsteps: PropTypes.array.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};
