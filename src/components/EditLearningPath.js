import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import LabeledIcon from './LabeledIcon';
import TitleEditor from './editors/TitleEditor';
import DescriptionEditor from './editors/DescriptionEditor';
import { titleI18N, descriptionI18N } from '../util/i18nFieldFinder';
import TagsInput from './editors/TagsInput';
import polyglot from '../i18n';

import Icon from './Icon';

import {
  updateLearningPathTitle,
  updateLearningPathDescription,
  updateLearningPath,
  updateLearningPathTags
} from '../actions';

export function EditLearningPath (props, {lang}) {
  let {
    tags,
    learningPath,
    updateTitle,
    updateDescription,
    updateTags,
    saveAction
  } = props;

  let titleText = titleI18N(learningPath, lang) || '';
  let descriptionText = descriptionI18N(learningPath, lang) || '';

  let saveLearningPath = () => saveAction(learningPath);


  return <div>
    <div className='learning-path_hd'>
      <span className='editable'><Icon.Create /></span>
      <h1 className='learning-path-input learning-path-input__title'>
        <TitleEditor value={titleText} onChange={updateTitle} lang={lang} />
      </h1>
    </div>
    <div className='learning-path_bd'>
      <span className='editable'><Icon.Create /></span>
      <div className='learning-path-input learning-path-input__paragraph'>
        <DescriptionEditor value={descriptionText} onChange={updateDescription} lang={lang} />
      </div>
      <div className='learning-path-input learning-path-input__paragraph'>
        <TagsInput onChange={updateTags} value={tags} lang={lang}/>
      </div>
      <button className='cta cta-link' onClick={saveLearningPath}>
        <LabeledIcon.Save labelText={polyglot.t('editPage.savePathBtn')} />
      </button>
    </div>
  </div>;
}

EditLearningPath.propTypes = {
  learningPath: PropTypes.object.isRequired,
  learningSteps: PropTypes.array.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateTags: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
  updateDescription: PropTypes.func.isRequired,
  saveAction: PropTypes.func.isRequired
};

EditLearningPath.contextTypes = {
  lang: PropTypes.string.isRequired
};

const mapStateToProps = state => Object.assign({}, state, {
  learningPath: get(state, 'learningPath', {}),
  learningSteps: get(state, 'learningPath.learningsteps', []),
  tags: get(state, 'learningPath.tags', [])
});

const mapDispatchToProps = {
  updateTitle: updateLearningPathTitle,
  updateDescription: updateLearningPathDescription,
  updateTags: updateLearningPathTags,
  saveAction: lp => updateLearningPath(lp.id, lp)
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLearningPath);
