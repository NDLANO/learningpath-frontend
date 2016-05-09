import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import assign from 'lodash/assign';
import { titleI18N, descriptionI18N, oembedUrlI18N, oembedContentI18N } from '../../util/i18nFieldFinder';
import LabeledIcon from '../LabeledIcon';
import TitleEditor from '../editors/TitleEditor';
import DescriptionHTMLEditor from '../editors/DescriptionHTMLEditor';
import polyglot from '../../i18n';
import MediaTypeSelect from './MediaTypeSelect';
import Icon from '../Icon';

import PreviewOembed from './PreviewOembed';

import {
  updateLearningPathStep,
  updateLearningPathStepDescription,
  updateLearningPathStepTitle,
  updateLearningPathStepType,
  updateLearningPathStepEmbedUrl,
  validateOembed
} from '../../actions';

export function EditLearningPathStep (props, {lang}) {
  const {
    step,
    updateTitle,
    updateType,
    updateEmbedUrl,
    updateDescription,
    learningPath,
    validateOembedUrl,
    saveAction,
    oembedIsValid
  } = props;
  const isValid = () => true;

  let saveLearningStep = () => saveAction(learningPath, step);
  let title = titleI18N(step, lang) || '';
  let htmlDescription = descriptionI18N(step, lang) || '';
  let embedContent = oembedContentI18N(step, lang);
  let embedContentUrl = oembedUrlI18N(step, lang);

  let embedSourceInput = '';
  if (step.type) {
    embedSourceInput =(
      <div className='learning-path_bd'>
        <div>
          <DescriptionHTMLEditor
            lang={lang}
            value={htmlDescription}
            onChange={updateDescription}
          />
        </div>

        <div className='learningsource-form'>
          <div>
            <label className='mediatype-menu__label'>{polyglot.t('editPathStep.urlLabel')}</label>
            <input type='url' value={embedContentUrl} onBlur={() => validateOembedUrl(embedContentUrl, lang)}
                onChange={(evt) => updateEmbedUrl({ url: evt.target.value, language: lang })}
                placeholder={polyglot.t('editPathStep.urlPlaceholder')} />
            <PreviewOembed content={embedContent} />
          </div>
        </div>
        <div>
          <button className='cta cta-link' onClick={saveLearningStep} disabled={ !isValid() || !oembedIsValid }>
            <LabeledIcon.Save labelText={polyglot.t('editPage.savePathBtn')} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='learning-path-step'>
      <div className='learning-path_hd'>
        <span className='editable'><Icon.Create /></span>
        <h1 className='learning-path-input learning-path-input__title'>
          <TitleEditor lang={lang} value={title} onChange={updateTitle} placeholder={polyglot.t('editPathStep.titlePlaceHolder')} />
        </h1>
        <div className='mediatype-wrapper'>
          <MediaTypeSelect value={step.type} onChange={updateType} />
        </div>
      </div>
      {embedSourceInput}
    </div>
  );
}

EditLearningPathStep.propTypes = {
  step: PropTypes.object.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateType: PropTypes.func.isRequired,
  updateEmbedUrl: PropTypes.func.isRequired,
  updateDescription: PropTypes.func.isRequired,
  learningPath: PropTypes.number.isRequired,
  saveAction: PropTypes.func.isRequired,
  oembedIsValid: PropTypes.bool.isRequired,
  validateOembedUrl: PropTypes.func.isRequired
};

EditLearningPathStep.contextTypes = {
  lang: PropTypes.string.isRequired
};

export const mapStateToProps = state => assign({}, state, {
  step: state.learningPathStep,
  learningPath: state.learningPath

});

export const mapDispatchToProps = {
  // actions som endrer learningPathStep i redux store:
  updateTitle: updateLearningPathStepTitle,
  updateType: updateLearningPathStepType,
  updateEmbedUrl: updateLearningPathStepEmbedUrl,
  updateDescription: updateLearningPathStepDescription,
  // action til persistere learningPathStep
  saveAction: (learningPath, lps) => updateLearningPathStep(learningPath.id, lps.id, lps, learningPath),

  validateOembedUrl: (embedContent, lang) => validateOembed(embedContent, lang)
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLearningPathStep);
