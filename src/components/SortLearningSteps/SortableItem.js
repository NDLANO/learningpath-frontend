import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { guid } from '../../util/util';
import flow from 'lodash/flow';

const itemSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.index
    };
  }
};

const itemTarget = {

  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      props.moveItem(draggedId, props.index);
    }
  }
};


function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class SortableItem extends Component {
  render() {
    const { isDragging, children, connectDragSource, connectDropTarget, placeholderStyle, placeholderClassName } = this.props;
    const opacity = isDragging ? 0 : 1;

    if (isDragging && (placeholderStyle || placeholderClassName)) {
      return connectDragSource(connectDropTarget(
        <div className={placeholderClassName} style={placeholderStyle}></div>
      ));
    }

    const clonedChildren = React.cloneElement(children, {
      style: Object.assign({}, children.props.style, {opacity})
    });

    return connectDragSource(connectDropTarget(
      clonedChildren
    ));
  }
}

SortableItem.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  placeholderClassName: PropTypes.string,
  placeholderStyle: PropTypes.object,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  moveItem: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

// N.B. to use this component you need to call it as a function to create the class
// Not sure of a better way to do this to enable non-colliding types for each parent component
export default (customType) => {
  const type = customType || guid();
  return flow(
    DragSource(type, itemSource, collectSource),
    DropTarget(type, itemTarget, collectTarget)
  )(SortableItem);
};
