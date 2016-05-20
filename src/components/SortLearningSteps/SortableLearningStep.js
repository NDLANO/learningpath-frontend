import { connect } from 'react-redux';

import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

import Icon from '../Icon';

import {
  updateStepSequenceNumber
} from '../../actions';

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
    const { id: overId, learningsteps } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findLearningStep(overId, learningsteps);
      props.moveLearningStep(draggedId, overIndex, learningsteps);
    }
  }
};

class SortableLearningStep extends Component {

  render() {
    const { title, isDragging, connectDragSource, connectDropTarget, placeholderStyle, placeholderClassName } = this.props;
    const opacity = isDragging ? 0 : 1;

    if (isDragging && (placeholderStyle || placeholderClassName)) {
      return connectDragSource(connectDropTarget(
        <div className={placeholderClassName} style={placeholderStyle}></div>
      ));
    }

    return connectDragSource(connectDropTarget(
      <li className='sortable_item' style={{ opacity }}>
        <div className='sortable_handle'>
          <Icon.ImportExport className="icon--m"/>
        </div>
        <div className='sortable_title'>
          {title}
        </div>
        <div className='sortable_action'>
          <button className="un-button">
            <Icon.Clear className="icon--m"/>
          </button>
        </div>
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
  placeholderStyle: PropTypes.object,
  placeholderClassName: PropTypes.string,
  learningsteps: PropTypes.array.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired
};
