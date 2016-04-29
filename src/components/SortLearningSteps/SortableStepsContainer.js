import { connect } from 'react-redux';
import get from 'lodash/get';
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
const style = {
  width: 400
};
const stepTarget = {
  drop() {
  }
};
class SortableStepsContainer extends Component {

  moveLearningStep(id, atIndex, learningsteps) {
    const { step, index } = this.findLearningStep(id, learningsteps);
    learningsteps.splice(index, 1);
    learningsteps.splice(atIndex, 0, step);
    this.state = learningsteps;
    this.props.sortSteps(learningsteps);
  }

  findLearningStep(id, learningsteps) {
    const step = learningsteps.filter(c => c.id === id)[0];

    return {
      step,
      index: learningsteps.indexOf(step)
    };
  }
  render() {
    this.moveLearningStep = this.moveLearningStep.bind(this);
    this.findLearningStep = this.findLearningStep.bind(this);
    let {lang} = this.context;

    if( this.props.learningPath.learningsteps === undefined){
      return <div></div>;
    }
    const learningsteps  = this.props.learningPath.learningsteps;
    this.state = learningsteps;
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div className='step-nav step-nav_editable'>
        <ul style={style} className='step-nav_list'>
          {learningsteps.map((step, i) => {
            return(
              <SortableLearningStep key={step.id}
                    index={i}
                    pathId={this.props.learningPath.id}
                    id={step.id}
                    title={titleI18N(step, lang)}
                    moveLearningStep={this.moveLearningStep}
                    findLearningStep={this.findLearningStep}
                    learningsteps={this.state}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}


const mapStateToProps = state => Object.assign({}, state, {
  learningPath: get(state, 'learningPath', {})
});
export const mapDispatchToProps = {
  sortSteps: sortLearningPathSteps
};
export default flow(
  DropTarget(ItemTypes.LEARNING_STEP, stepTarget, connect => ({connectDropTarget: connect.dropTarget()})),
  DragDropContext(HTML5Backend),
  connect(mapStateToProps, mapDispatchToProps)
)(SortableStepsContainer);

SortableStepsContainer.propTypes = {
  learningPath: PropTypes.object.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  sortSteps: PropTypes.func.isRequired
};

SortableStepsContainer.contextTypes = {
  lang: PropTypes.string.isRequired
};
