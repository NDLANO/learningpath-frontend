/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import defined from 'defined';
import { reduxForm } from 'redux-form';
import { titleI18N, descriptionI18N, oembedUrlI18N, oembedContentI18N } from '../../../util/i18nFieldFinder';
import { createValidator, required, oneOfIsRequired } from '../../../util/validation';
import LabeledIcon from '../../../common/LabeledIcon';
import DescriptionHTMLEditor from '../../../common/editors/DescriptionHTMLEditor';
import MediaTypeSelect from './MediaTypeSelect';
import polyglot from '../../../i18n';
import Icon from '../../../common/Icon';
import OnClickCheckbox from './OnClickCheckbox';
import OneLineEditor from '../../../common/editors/OneLineEditor';
import ObjectSelector from '../../../common/form/ObjectSelector';
import PreviewOembed from '../oembed/PreviewOembed';
import LearningPathStepIcon from '../LearningPathStepIcon';
import { validateOembed } from './validateOembedActions';

const LearningPathStepForm = (props) => {
  const {
    step,
    lang,
    oembedPreview,
    error,
    fields: { title, description, type, url, showTitle, license },
    handleSubmit,
    submitting,
    learningPathId,
    licenseOptions,
  } = props;

  const embedContent = oembedContentI18N({ embedUrl: oembedPreview }, lang);

  const abortUrl = step.id ? `/learningpaths/${learningPathId}/step/${step.id}` : `/learningpaths/${learningPathId}`;

  const handleDescriptionBlur = (value) => {
    if (!showTitle.touched && !step.id) {
      if (value.hasText()) {
        showTitle.onChange(true);
      } else {
        showTitle.onChange(false);
      }
    }
    description.onBlur(value);
  };

  if (!type.value) {
    return <MediaTypeSelect {...type} />;
  }
  return (
    <form onSubmit={handleSubmit} className="learning-step-form">
      <div className="learning-step-form_group">
        <span className="learning-step-form_mediatype-icon">
          <LearningPathStepIcon learningPathStepType={type.value} isCircle={false} />
        </span>
        <select className="learning-step-form_mediatype-dd" {...type} >
          <option value="INTRODUCTION">{polyglot.t('editPathStep.mediatype.introduction')}</option>
          <option value="TEXT">{polyglot.t('editPathStep.mediatype.text')}</option>
          <option value="MULTIMEDIA">{polyglot.t('editPathStep.mediatype.multimedia')}</option>
          <option value="QUIZ">{polyglot.t('editPathStep.mediatype.quiz')}</option>
          <option value="TASK">{polyglot.t('editPathStep.mediatype.task')}</option>
          <option value="SUMMARY">{polyglot.t('editPathStep.mediatype.summary')}</option>
        </select>
      </div>
      <div className="learning-step-form_group">
        <ObjectSelector className="learning-step-form_select" idKey="license" labelKey="description" options={licenseOptions} {...license} />
      </div>
      <div className="learning-step-form_group">
        <div className="learning-step-form_left">
          <span className="learning-step-form_icon-bg"><Icon.Create /></span>
          <OnClickCheckbox {...showTitle} />
        </div>
        <div className="learning-step-form_right">
          <div className="learning-step-form_input learning-step-form_title">
            <OneLineEditor lang={lang} {...title} placeholder={polyglot.t('editPathStep.titlePlaceHolder')} />
          </div>
          {title.touched && title.error && <span className="error_message error_message--red">{title.error}</span>}
        </div>
      </div>
      <DescriptionHTMLEditor lang={lang} {...description} onBlur={handleDescriptionBlur} />
      <div className="learning-step-form_group">
        <div className="learningsource-form">
          <div>
            <label htmlFor="url" className="mediatype-menu__label">{polyglot.t('editPathStep.urlLabel')}</label>
            <input
              id="url"
              type="url"
              {...url}
              placeholder={polyglot.t('editPathStep.urlPlaceholder')}
            />
            {url.touched && url.error && <span className="error_message error_message--red">{url.error}</span>}
            <PreviewOembed content={embedContent} />
          </div>
        </div>
        {(url.touched || description.touched) && error && <span className="error_message error_message--red">{error}</span>}
        <div className="block-container_fixed block-container_fixed--bottom--right">
          <div className="button-group">
            <Link to={abortUrl} className="button button--secondary">
              <LabeledIcon.Clear labelText={polyglot.t('editPage.cancelBtn')} />
            </Link>
            <button disabled={submitting} className="button button--primary" type="submit">
              <LabeledIcon.Save labelText={polyglot.t('editPage.savePathBtn')} />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

LearningPathStepForm.propTypes = {
  lang: PropTypes.string.isRequired,
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  step: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  learningPathId: PropTypes.number.isRequired,
  oembedPreview: PropTypes.array.isRequired,
  validateOembedUrl: PropTypes.func.isRequired,
  licenseOptions: PropTypes.array.isRequired,
};


const mapStateToProps = (state, props) => ({
  oembedPreview: state.oembedPreview.oembedContent,
  initialValues: {
    showTitle: defined(props.step.showTitle, false),
    title: titleI18N(props.step, props.lang),
    description: descriptionI18N(props.step, props.lang),
    url: oembedUrlI18N(props.step, props.lang),
    type: props.step.type,
    license: defined(props.step.license, ''),
  },
});

const mapDispatchToProps = {
  validateOembedUrl: (embedContent, lang) => validateOembed(embedContent, lang),
};


const asyncValidate = (values, dispatch, props) => {
  const { validateOembedUrl, lang } = props;
  return validateOembedUrl(values.url, lang);
};

const validate = createValidator({
  title: required(),
  _error: oneOfIsRequired('editPathStep.validation.oneOfDescriptionOrUrlIsRequired', 'url', 'description'),
});

export default reduxForm({
  form: 'learning-path-step',
  fields: ['title', 'description', 'url', 'type', 'showTitle', 'license'],
  asyncValidate,
  validate,
  asyncBlurFields: ['url'],
}, mapStateToProps, mapDispatchToProps)(LearningPathStepForm);
