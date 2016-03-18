import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import LabeledIcon from '../LabeledIcon';
import Navigation from './Navigation';
import PathStep from './PathStep';
import PathIntroduction from './PathIntroduction';
import TitleEditor from './TitleEditor';
import DescriptionEditor from './DescriptionEditor';
import { titleI18N, descriptionI18N } from '../../util/i18nFieldFinder';

import {
  createNewEditingPathStep,
  updateEditingPathStep,
  updateEditingPathTitle,
  updateEditingPathDescription,
  updateEditingLearningPath
} from '../../actions';

export function EditLearningPath (props) {
  let { dispatch, learningSteps, learningPath, saveAction, lang } = props;

  let pathSteps = learningSteps.map(step => (
    <PathStep key={step.seqNo} {...props} step={step}
      onSubmit={s => dispatch(updateEditingPathStep(s))} />
  ));

  let titleText = titleI18N(learningPath, lang) || '';
  let updateTitle = (nextTitle) => {
    return dispatch(updateEditingPathTitle(nextTitle));
  };

  let descriptionText = descriptionI18N(learningPath, lang) || '';
  let updateDescription = (nextDescription) => {
    return dispatch(updateEditingPathDescription(nextDescription));
  };

  let saveLearningPath = () => {
    dispatch(saveAction(learningPath));
  };

  return (<div className='two-column'>
      <aside className='two-column_col'>
        <div className='step-nav'>
          <div className='learningpath-general-info'>
            <h2 className='learningpath-general-info_h'>
              <TitleEditor lang={lang} value={titleText} onChange={updateTitle} />
            </h2>
          </div>
          <Navigation {...props} />
        </div>
        <ul className='vertical-menu'>
          <li className='vertical-menu_item'>
            <button className='cta cta-link cta-link--block' onClick={saveLearningPath}>
              <LabeledIcon.Save labelText='Lagre' />
            </button>
          </li>
        </ul>
      </aside>
      <main className='two-column_col'>
        <h2>
          <DescriptionEditor lang={lang} value={descriptionText} onChange={updateDescription} />
        </h2>
        {pathSteps}
        <button className='cta-link cta-link--block'
            onClick={() => dispatch(createNewEditingPathStep())}>
          <LabeledIcon.Add labelText='Legg til nytt læringssteg' />
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
