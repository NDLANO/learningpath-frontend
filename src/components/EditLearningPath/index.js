import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import Icon from '../Icon';
import Navigation from './Navigation';
import PathStep from './PathStep';
import PathIntroduction from './PathIntroduction';

export function EditLearningPath (props) {
  const onStepChange = step => console.log(step);

  let pathSteps = get(props, 'learningPath.learningsteps', []).map(step => (
    <PathStep key={step.seqNo} {...props} step={step} onSubmit={onStepChange} />
  ));

  return (<div className='two-column'>
      <aside className='two-column_col'>
        <Navigation {...props} />
      </aside>
      <main className='two-column_col'>
        <PathIntroduction {...props} />
        {pathSteps}
        <a className='cta cta-link cta-link--block' href='#'>
          <Icon.Add />
          <span className="icon--space">Legg til nytt læringssteg</span>
        </a>
      </main>
  </div>);
}


const mapStateToProps = state => Object.assign({}, state, {
  learningPath: state.editingLearningPath
});

export default connect(mapStateToProps)(EditLearningPath);
