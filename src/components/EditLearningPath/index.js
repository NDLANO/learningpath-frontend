import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import Icon from '../Icon';
import Navigation from './Navigation';
import PathStep from './PathStep';
import PathIntroduction from './PathIntroduction';

import {
  createNewEditingPathStep,
  updateEditingPathStep,
  updateEditingLearningPath
} from '../../actions';

export function EditLearningPath (props) {
  let { dispatch, learningSteps, learningPath, saveAction } = props;

  let pathSteps = learningSteps.map(step => (
    <PathStep key={step.seqNo} {...props} step={step}
      onSubmit={s => dispatch(updateEditingPathStep(s))} />
  ));

  let saveLearningPath = () => dispatch(saveAction(learningPath));

  return (<div className='two-column'>
      <aside className='two-column_col'>
        <Navigation {...props} />
        <div className='vertical-menu'>
          <button className='cta cta-link cta-link--block'
            onClick={saveLearningPath}>
            <Icon.Save />
            <span className="icon--space">Lagre</span>
          </button>
        </div>
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

EditLearningPath.propTypes = {
  learningPath: PropTypes.object.isRequired,
  learningSteps: PropTypes.array.isRequired,
  saveAction: PropTypes.func.isRequired
};

const mapStateToProps = state => Object.assign({}, state, {
  learningPath: get(state, 'editingLearningPath', {}),
  learningSteps: get(state, 'editingLearningPath.learningsteps', []),
  saveAction: lp => updateEditingLearningPath(lp.id, lp)
});

export default connect(mapStateToProps)(EditLearningPath);
