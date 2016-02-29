import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import Icon from '../Icon';
import Navigation from './Navigation';
import PathStep from './PathStep';
import PathIntroduction from './PathIntroduction';
import TitleEditor from './TitleEditor';
import { titleI18N } from '../../util/i18nFieldFinder';

import {
  createNewEditingPathStep,
  updateEditingPathStep,
  updateEditingPathTitle,
  updateEditingLearningPath
} from '../../actions';

export function EditLearningPath (props) {
  let { dispatch, learningSteps, learningPath, saveAction, lang } = props;

  let pathSteps = learningSteps.map(step => (
    <PathStep key={step.seqNo} {...props} step={step}
      onSubmit={s => dispatch(updateEditingPathStep(s))} />
  ));

  let titleText = titleI18N(learningPath, lang);
  let updateTitle = (nextTitle) => dispatch(updateEditingPathTitle(nextTitle));

  let saveLearningPath = () => dispatch(saveAction(learningPath));

  return (<div className='two-column'>
      <aside className='two-column_col'>
        <div className='step-nav'>
          <div className='step-nav_learningpath-general-info'>
            <h2 className='step-nav_h'>
              <TitleEditor lang={lang} value={titleText} onChange={updateTitle} />
            </h2>
          </div>
          <Navigation {...props} />
        </div>
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
