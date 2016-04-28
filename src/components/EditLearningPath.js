import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import get from 'lodash/get';
import LabeledIcon from './LabeledIcon';
import TitleEditor from './editors/TitleEditor';
import DescriptionEditor from './editors/DescriptionEditor';
import { titleI18N, descriptionI18N } from '../util/i18nFieldFinder';
import polyglot from '../i18n';
import Container from './SortableTest/Container';

import {
  updateLearningPathTitle,
  updateLearningPathDescription,
  updateLearningPath
} from '../actions';

export function EditLearningPath (props, {lang}) {
  let {
    learningPath,
    updateTitle,
    updateDescription,
    saveAction
  } = props;

  let titleText = titleI18N(learningPath, lang) || '';
  let descriptionText = descriptionI18N(learningPath, lang) || '';

  let saveLearningPath = () => saveAction(learningPath);

  return <div>
    <h2>
      <TitleEditor value={titleText} onChange={updateTitle} lang={lang} />
    </h2>
    <DescriptionEditor value={descriptionText} onChange={updateDescription} lang={lang} />
    <div>
      <Container />
    </div>
    <button className='cta cta-link' onClick={saveLearningPath}>
      <LabeledIcon.Save labelText={polyglot.t('editPage.savePathBtn')} />
    </button>

    <div>
      <Link to={`/learningpaths/${learningPath.id}/step/new`}>
        <LabeledIcon.Add labelText={polyglot.t('editPage.addStepBtn')} />
      </Link>
    </div>
  </div>;
}

EditLearningPath.propTypes = {
  learningPath: PropTypes.object.isRequired,
  learningSteps: PropTypes.array.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateDescription: PropTypes.func.isRequired,
  saveAction: PropTypes.func.isRequired
};

EditLearningPath.contextTypes = {
  lang: PropTypes.string.isRequired
};

const mapStateToProps = state => Object.assign({}, state, {
  learningPath: get(state, 'learningPath', {}),
  learningSteps: get(state, 'learningPath.learningsteps', [])
});

const mapDispatchToProps = {
  updateTitle: updateLearningPathTitle,
  updateDescription: updateLearningPathDescription,
  saveAction: lp => updateLearningPath(lp.id, lp)
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLearningPath);
