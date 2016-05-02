import { connect } from 'react-redux';

import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import {
  updateStepSequenceNumber
} from '../../actions';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

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
    else{
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
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findLearningStep(overId,props.learningsteps);
      props.moveLearningStep(draggedId, overIndex, props.learningsteps);
    }
  }
};

class SortableLearningStep extends Component {

  render() {
    const { title, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;
    return connectDragSource(connectDropTarget(
      <li className='step-nav_item'>
        <a className='step-nav_link' style={{ style, opacity }}>
          {title}
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
  DropTarget(ItemTypes.LEARNING_STEP, stepTarget, connect => ({connectDropTarget: connect.dropTarget()})),
  DragSource(ItemTypes.LEARNING_STEP, stepSource, (connect, monitor) => ({connectDragSource: connect.dragSource(),isDragging: monitor.isDragging()})),
  connect(mapStateToProps, mapDispatchToProps)
)(SortableLearningStep);


SortableLearningStep.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  moveLearningStep: PropTypes.func.isRequired,
  findLearningStep: PropTypes.func.isRequired,
  learningsteps: PropTypes.any.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired
};
