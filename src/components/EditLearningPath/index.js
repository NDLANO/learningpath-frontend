import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import LabeledIcon from '../LabeledIcon';
import Navigation from './Navigation';
import PathStep from './PathStep';
import TitleEditor from '../editors/TitleEditor';
import DescriptionEditor from '../editors/DescriptionEditor';
import { titleI18N, descriptionI18N } from '../../util/i18nFieldFinder';
import polyglot from '../../i18n';

import {
  createLearningPathStep,
  updateLearningPathStep,
  updateLearningPathTitle,
  updateLearningPathDescription,
  updateLearningPath
} from '../../actions';

export function EditLearningPath (props, {lang}) {
  let { dispatch, learningSteps, learningPath, saveAction } = props;

  let pathSteps = learningSteps.map(step => (
    <PathStep key={step.seqNo} {...props} step={step}
      onSubmit={s => dispatch(updateLearningPathStep(s))} />
  ));

  let titleText = titleI18N(learningPath, lang) || '';
  let updateTitle = (nextTitle) => {
    return dispatch(updateLearningPathTitle(nextTitle));
  };

  let descriptionText = descriptionI18N(learningPath, lang) || '';
  let updateDescription = (nextDescription) => {
    return dispatch(updateLearningPathDescription(nextDescription));
  };

  let saveLearningPath = () => {
    dispatch(saveAction(learningPath));
  };

  return (<div className='two-column'>
      <aside className='two-column_col'>
        <div className='step-nav'>
          <div className='learningpath-general-info'>
            <h2 className='learningpath-general-info_h'>
              <TitleEditor value={titleText} onChange={updateTitle} lang={lang} />
            </h2>
          </div>
          <Navigation {...props} />
        </div>
        <ul className='vertical-menu'>
          <li className='vertical-menu_item'>
            <button className='cta cta-link cta-link--block' onClick={saveLearningPath}>
              <LabeledIcon.Save labelText={polyglot.t('editPage.savePathBtn')} />
            </button>
          </li>
        </ul>
      </aside>
      <main className='two-column_col'>
        <h2>{polyglot.t('editPage.learningpathShortDescriptionTitle')}</h2>
        <DescriptionEditor value={descriptionText} onChange={updateDescription} lang={lang} />
        {pathSteps}
        <button className='cta-link cta-link--block'
            onClick={() => dispatch(createLearningPathStep())}>
          <LabeledIcon.Add labelText={polyglot.t('editPage.addStepBtn')} />
        </button>
      </main>
  </div>);
}

EditLearningPath.propTypes = {
  dispatch: PropTypes.func.isRequired,
  learningPath: PropTypes.object.isRequired,
  learningSteps: PropTypes.array.isRequired,
  saveAction: PropTypes.func.isRequired
};

EditLearningPath.contextTypes = {
  lang: PropTypes.string.isRequired
};

const mapStateToProps = state => Object.assign({}, state, {
  learningPath: get(state, 'learningPath', {}),
  learningSteps: get(state, 'learningPath.learningsteps', []),
  saveAction: lp => updateLearningPath(lp.id, lp)
});

export default connect(mapStateToProps)(EditLearningPath);
