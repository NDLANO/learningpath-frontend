import React, { PropTypes } from 'react';
import { Link } from 'react-router';
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
  validateOembed,
  deletePersistedLearningPathStep,
  deleteUnPersistedLearningPathStep
} from '../../actions';

export function EditLearningPathStep (props, {lang}) {
  const {
    step,
    updateTitle,
    updateType,
    updateEmbedUrl,
    updateDescription,
    learningPathId,
    validateOembedUrl,
    saveAction,
    oembedIsValid,
    deleteAction

  } = props;
  const isValid = () => true;

  let saveLearningStep = () => saveAction(learningPathId, step);
  let deleteLearningStep = () => deleteAction(learningPathId, step);
  let title = titleI18N(step, lang) || '';
  let htmlDescription = descriptionI18N(step, lang) || '';
  let embedContent = oembedContentI18N(step, lang);
  let embedContentUrl = oembedUrlI18N(step, lang);

  let embedSourceInput = '';
  if (step.type) {
    embedSourceInput =(
      <div className='learning-step_bd'>
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
        <div className='block-container_fixed block-container_fixed--bottom--right'>
          <div className="button-group">
            <Link to={`/learningpaths/${learningPathId}/step/${step.id}`} className="button button--secondary">
              <LabeledIcon.Clear labelText={polyglot.t('editPage.cancelBtn')} />
            </Link>
            <button className='button button--primary' onClick={saveLearningStep} disabled={ !isValid() || !oembedIsValid }>
              <LabeledIcon.Save labelText={polyglot.t('editPage.savePathBtn')} />
            </button>
          </div>
        </div>
        <div>
          <button className='cta cta-link--secondary' onClick={deleteLearningStep}>
            <LabeledIcon.Delete labelText={polyglot.t('editPage.deletePathBtn')} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='learning-path-step'>
      <div className='learning-step_hd'>
        <span className='editable'><Icon.Create /></span>
        <h1 className='learning-step-input learning-step-input__title'>
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
  learningPathId: PropTypes.number.isRequired,
  saveAction: PropTypes.func.isRequired,
  oembedIsValid: PropTypes.bool.isRequired,
  validateOembedUrl: PropTypes.func.isRequired,
  deleteAction: PropTypes.func.isRequired
};

EditLearningPathStep.contextTypes = {
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
  saveAction: (learningPathId, lps) => updateLearningPathStep(learningPathId, lps.id, lps),
  deleteAction: (learningPathId, lps) => lps.id ? deletePersistedLearningPathStep(learningPathId, lps) : deleteUnPersistedLearningPathStep(learningPathId, {lps}),
  validateOembedUrl: (embedContent, lang) => validateOembed(embedContent, lang)
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLearningPathStep);
