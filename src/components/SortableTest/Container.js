import { connect } from 'react-redux';
import get from 'lodash/get';
import flow from 'lodash/flow';
import assign from 'lodash/assign';
import ItemTypes from './ItemTypes';

import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import Card from './Card';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { titleI18N } from '../../util/i18nFieldFinder';
import {
  doStuff,
  sortLearningPathSteps
} from '../../actions';
const style = {
  width: 400
};
const cardTarget = {
  drop() {
  }
};
class Container extends Component {




  moveCard(id, atIndex, cards) {
   const { card, index } = this.findCard(id, cards);
   let test = cards;
   var lol = cards.splice(index, 1);
   var hei = cards.splice(atIndex, 0, card);
   this.state = cards;
   this.props.sortSteps(cards);
  }

  findCard(id, cards) {
    const card = cards.filter(c => c.id === id)[0];

    return {
      card,
      index: cards.indexOf(card)
    };
  }
  render() {
    this.moveCard = this.moveCard.bind(this);
    this.findCard = this.findCard.bind(this);
    if( this.props.learningPath.learningsteps === undefined){
      return <div></div>;
    }
    const cards  = this.props.learningPath.learningsteps
    this.state = cards;
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div className='step-nav step-nav_editable'>
        <ul style={style} className='step-nav_list'>
          {cards.map((card, i) => {
            return(
              <Card key={card.id}
                    index={i}
                    pathId={this.props.learningPath.id}
                    id={card.id}
                    text={titleI18N(card, "nb")}
                    moveCard={this.moveCard}
                    findCard={this.findCard}
                    cards={this.state}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

Container.propTypes = {
  learningPath: PropTypes.object.isRequired
};

Container.contextTypes = {
  lang: PropTypes.string.isRequired
};

const mapStateToProps = state => Object.assign({}, state, {
  learningPath: get(state, 'learningPath', {}),
});
export const mapDispatchToProps = {
  sortSteps: sortLearningPathSteps
};
export default flow(
  DropTarget(ItemTypes.CARD, cardTarget, connect => ({connectDropTarget: connect.dropTarget()})),
  DragDropContext(HTML5Backend),
  connect(mapStateToProps, mapDispatchToProps)
)(Container);
