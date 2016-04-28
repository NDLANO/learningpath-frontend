import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ItemTypes from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};
const cardTarget = {
  drop(props, monitor, component) {
    console.log(monitor.didDrop())
  },

  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    //console.log(monitor.didDrop());
    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex, props.cards);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};



class Card extends Component{
  render() {
    const { text, isDragging, connectDropTarget, connectDragSource } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      <li className='step-nav_item'>
        { connectDropTarget(
          <a className='step-nav_link' style={{ opacity }}>
            {text}
          </a>
        )}
      </li>
    );
  }
}

export default flow(
  DragSource(ItemTypes.LEARNING_PATH_STEP, cardSource, ((connect, monitor) => ({connectDragSource: connect.dragSource(), isDragging: monitor.isDragging()}))),
  DropTarget(ItemTypes.LEARNING_PATH_STEP, cardTarget, (connect => ({connectDropTarget: connect.dropTarget()})))
)(Card);
Card.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
  moveCard: PropTypes.func.isRequired,
  cards: PropTypes.any.isRequired
};
