import { connect } from 'react-redux';

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ItemTypes from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import get from 'lodash/get';
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

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findCard(props.id, props.cards).index
    };
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();
    if (!didDrop) {
      props.moveCard(droppedId, originalIndex, props.cards);
    }
    else{

      const cards = props.cards
      const newIndex = props.findCard(props.id, props.cards).index
      console.log(cards)
      if(newIndex === originalIndex){
        return;
      }
      if (newIndex === (cards.length - 1)){
        props.updateSeqNo(props.pathId, props.id, cards[newIndex - 1].seqNo);
      }
      else if (newIndex === 0){
        props.updateSeqNo(props.pathId, props.id, cards[newIndex + 1].seqNo);
      }
      else if (newIndex > 0 && newIndex < (cards.length - 1)){
        props.updateSeqNo(props.pathId, props.id, cards[newIndex - 1].seqNo);
      }
    }
  }
};

const cardTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findCard(overId,props.cards);
      props.moveCard(draggedId, overIndex, props.cards);
    }
  }
};

class Card extends Component {

  render() {
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;
    return connectDragSource(connectDropTarget(
      <div style={{ style, opacity }}>
        {text}
      </div>
    ));
  }
}

export const mapDispatchToProps = {
  updateSeqNo: updateStepSequenceNumber
};
const mapStateToProps = state => Object.assign({}, state, {});


export default flow(
  DropTarget(ItemTypes.CARD, cardTarget, connect => ({connectDropTarget: connect.dropTarget()})),
  DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({connectDragSource: connect.dragSource(),isDragging: monitor.isDragging()})),
  connect(mapStateToProps, mapDispatchToProps)
)(Card);


Card.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
  moveCard: PropTypes.func.isRequired,
  cards: PropTypes.any.isRequired
};
