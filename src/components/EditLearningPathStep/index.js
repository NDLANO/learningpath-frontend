import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import assign from 'lodash/assign';
import { titleI18N, descriptionI18N, embedUrlI18N } from '../../util/i18nFieldFinder';
import LabeledIcon from '../LabeledIcon';
import TitleEditor from '../editors/TitleEditor';
import DescriptionHTMLEditor from '../editors/DescriptionHTMLEditor';
import polyglot from '../../i18n';
import MediaTypeSelect from './MediaTypeSelect';
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
    learningPathId,
    validateOembedUrl,
    saveAction,
    oembedIsValid
  } = props;
  const isValid = () => true;

  //const isOembedValid = isOembedValid === undefined ? true : step.isOembedValid;

  let saveLearningStep = () => saveAction(learningPathId, step);
  let title = titleI18N(step, lang) || '';
  let htmlDescription = descriptionI18N(step, lang) || '';
  let embedContent = embedUrlI18N(step, lang);

  let embedSourceInput = '';
  if (step.type) {
    embedSourceInput =(
      <div className='learningsource-form'>
        <div>
          <label className='mediatype-menu__label'>{polyglot.t('editPathStep.urlLabel')}</label>
          <input type='url' value={embedContent} onBlur={() => validateOembedUrl(embedContent)}
              onChange={(evt) => updateEmbedUrl({ url: evt.target.value, language: lang })}
              placeholder={polyglot.t('editPathStep.urlPlaceholder')} />
        </div>
      </div>
    );
  }

  return (
    <div className='learning-path-step'>
      <div className='learning-path_hd'>
        <h1 className='learing-path_title'>
          <TitleEditor lang={lang} value={title} onChange={updateTitle} />
        </h1>
      </div>
      <div className='learning-path_bd'>
        <div>
          <DescriptionHTMLEditor
            lang={lang}
            value={htmlDescription}
            onChange={updateDescription}
          />
        </div>

        <div className='mediatype-wrapper'>
          <MediaTypeSelect value={step.type} onChange={updateType} />

          {embedSourceInput}
        </div>
        <div>
          <button className='cta cta-link' onClick={saveLearningStep} disabled={ !isValid() || !oembedIsValid }>
            <LabeledIcon.Save labelText={polyglot.t('editPage.savePathBtn')} />
          </button>
        </div>
      </div>
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
  validateOembedUrl: PropTypes.func.isRequired
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

  validateOembedUrl: (embedContent) => validateOembed(embedContent)
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLearningPathStep);
