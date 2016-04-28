import { connect } from 'react-redux';
import get from 'lodash/get';
import flow from 'lodash/flow';
import assign from 'lodash/assign';

import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import Card from './Card';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { titleI18N } from '../../util/i18nFieldFinder';
import {
  sortLearningPathSteps
} from '../../actions';
const style = {
  width: 400
};

class Container extends Component {


  moveCard(dragIndex, hoverIndex, cards) {
    const dragCard = cards[dragIndex];
    let test = cards;
    var lol = cards.splice(dragIndex, 1);
    var hei = cards.splice(hoverIndex, 0, dragCard);
    this.state = cards;
    this.props.sortSteps(cards);
  }

  render() {
    this.moveCard = this.moveCard.bind(this);
    if( this.props.learningPath.learningsteps === undefined){
      return <div></div>;
    }
    const cards  = this.props.learningPath.learningsteps
    this.state = cards;
    return (
      <div className='step-nav step-nav_editable'>
        <ul style={style} className='step-nav_list'>
          {cards.map((card, i) => {
            return (
              <Card key={card.id}
                    index={i}
                    id={card.id}
                    text={titleI18N(card, "nb")}
                    moveCard={this.moveCard}
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
  DragDropContext(HTML5Backend),
  connect(mapStateToProps, mapDispatchToProps)
)(Container);
