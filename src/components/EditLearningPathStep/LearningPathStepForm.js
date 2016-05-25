import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import assign from 'lodash/assign';
import { titleI18N, descriptionI18N, oembedUrlI18N, oembedContentI18N } from '../../util/i18nFieldFinder';
import LabeledIcon from '../LabeledIcon';
import DescriptionHTMLEditor from '../editors/DescriptionHTMLEditor';
import polyglot from '../../i18n';
import Icon from '../Icon';
import TitleEditor from '../editors/TitleEditor';

import PreviewOembed from './PreviewOembed';
import LearningPathStepIcon from '../LearningPathStepIcon';
import {
  updateLearningPathStep,
  updateLearningPathStepDescription,
  updateLearningPathStepTitle,
  updateLearningPathStepType,
  updateLearningPathStepEmbedUrl,
  validateOembed,
  createLearningPathStep
} from '../../actions';


const LearningPathStepForm = (props, {lang}) => {
  const {
    step,
    updateEmbedUrl,
    updateDescription,
    learningPathId,
    updateTitle,
    validateOembedUrl,
    saveAction,
    oembedIsValid,
    updateType
  } = props;
  const isValid = () => true;

  let saveLearningStep = () => saveAction(learningPathId, step);
  const title = titleI18N(step, lang) || '';
  const htmlDescription = descriptionI18N(step, lang) || '';
  const embedContent = oembedContentI18N(step, lang);
  const embedContentUrl = oembedUrlI18N(step, lang);

  const abortUrl = step.id ? `/learningpaths/${learningPathId}/step/${step.id}` : `/learningpaths/${learningPathId}`;
  return (
    <div>
      <div className="learning-step_hd">
        <span className="mediatype-icon">
          <LearningPathStepIcon learningPathStepType={step.type} isCircle={false} />
        </span>
        <select className="mediatype-dd" value={step.type} onChange={(evt) => updateType(evt.target.value)}>
          <option value="INTRODUCTION">{polyglot.t('editPathStep.mediatype.introduction')}</option>
          <option value="TEXT">{polyglot.t('editPathStep.mediatype.text')}</option>
          <option value="MULTIMEDIA">{polyglot.t('editPathStep.mediatype.multimedia')}</option>
          <option value="QUIZ">{polyglot.t('editPathStep.mediatype.quiz')}</option>
          <option value="TASK">{polyglot.t('editPathStep.mediatype.task')}</option>
          <option value="SUMMARY">{polyglot.t('editPathStep.mediatype.summary')}</option>
        </select>
        <span className="editable"><Icon.Create /></span>
        <h1 className="learning-step-input learning-step-input__title">
          <TitleEditor lang={lang} value={title} onChange={updateTitle} placeholder={polyglot.t('editPathStep.titlePlaceHolder')} />
        </h1>
      </div>
      <div className="learning-path_bd">
        <div>
          <DescriptionHTMLEditor
            lang={lang}
            value={htmlDescription}
            onChange={updateDescription}
          />
        </div>

        <div className="learningsource-form">
          <div>
            <label className="mediatype-menu__label">{polyglot.t('editPathStep.urlLabel')}</label>
            <input
              type="url" value={embedContentUrl} onBlur={() => validateOembedUrl(embedContentUrl, lang)}
              onChange={(evt) => updateEmbedUrl({ url: evt.target.value, language: lang })}
              placeholder={polyglot.t('editPathStep.urlPlaceholder')}
            />
            <PreviewOembed content={embedContent} />
          </div>
        </div>
        <div className="block-container_fixed block-container_fixed--bottom--right">
          <div className="button-group">
            <Link to={abortUrl} className="button button--secondary">
              <LabeledIcon.Clear labelText={polyglot.t('editPage.cancelBtn')} />
            </Link>
            <button className="button button--primary" onClick={saveLearningStep} disabled={!isValid() || !oembedIsValid}>
              <LabeledIcon.Save labelText={polyglot.t('editPage.savePathBtn')} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
LearningPathStepForm.propTypes = {
  step: PropTypes.object.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateType: PropTypes.func.isRequired,
  updateEmbedUrl: PropTypes.func.isRequired,
  updateDescription: PropTypes.func.isRequired,
  learningPathId: PropTypes.number.isRequired,
  saveAction: PropTypes.func.isRequired,
  oembedIsValid: PropTypes.bool.isRequired,
  validateOembedUrl: PropTypes.func.isRequired

};

LearningPathStepForm.contextTypes = {
  lang: PropTypes.string.isRequired
};

export const mapStateToProps = state => assign({}, state, {
  step: state.learningPathStep,
  learningPathId: state.learningPath.id
});

export const mapDispatchToProps = {
  // actions som endrer learningPathStep i redux store:
  updateTitle: updateLearningPathStepTitle,
  updateType: updateLearningPathStepType,
  updateEmbedUrl: updateLearningPathStepEmbedUrl,
  updateDescription: updateLearningPathStepDescription,
  // action til persistere learningPathStep
  saveAction: (learningPathId, lps) => (lps.id ? updateLearningPathStep(learningPathId, lps.id, lps) : createLearningPathStep(learningPathId, lps)),
  validateOembedUrl: (embedContent, lang) => validateOembed(embedContent, lang)
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningPathStepForm);
