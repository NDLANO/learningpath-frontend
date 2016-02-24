import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { createNewEditingPathStep } from '../../actions';
import Icon from '../Icon';
import Navigation from './Navigation';
import PathStep from './PathStep';
import PathIntroduction from './PathIntroduction';

export function EditLearningPath (props) {
  const onStepChange = step => console.log(step);

  let { dispatch, learningSteps } = props;

  let pathSteps = learningSteps.map(step => (
    <PathStep key={step.seqNo} {...props} step={step} onSubmit={onStepChange} />
  ));

  return (<div className='two-column'>
      <aside className='two-column_col'>
        <Navigation {...props} />
      </aside>
      <main className='two-column_col'>
        <PathIntroduction {...props} />
        {pathSteps}
        <button className='cta cta-link cta-link--block'
            onClick={() => dispatch(createNewEditingPathStep())}>
          <Icon.Add />
          <span className="icon--space">Legg til nytt læringssteg</span>
        </button>
      </main>
  </div>);
}


const mapStateToProps = state => Object.assign({}, state, {
  learningPath: get(state, 'editingLearningPath', {}),
  learningSteps: get(state, 'editingLearningPath.learningsteps', [])
});

export default connect(mapStateToProps)(EditLearningPath);
