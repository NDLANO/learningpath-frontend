/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router';
import defined from 'defined';
import { reduxForm, Field, change } from 'redux-form';
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
import InputField from '../../../common/form/InputField';

import PreviewOembed from '../oembed/PreviewOembed';
import LearningPathStepIcon from '../LearningPathStepIcon';
import { validateOembed } from './validateOembedActions';

const formName = 'learning-path-step';
const LearningPathStepForm = (props) => {
  const {
    step,
    lang,
    oembedPreview,
    error,
    handleSubmit,
    submitting,
    learningPathId,
    licenseOptions,
    formValues,
    formFields,
    localChange,
    valid,
  } = props;
  const embedContent = oembedContentI18N({ embedUrl: oembedPreview }, lang);
  const abortUrl = step.id ? `/learningpaths/${learningPathId}/step/${step.id}` : `/learningpaths/${learningPathId}`;
  const handleDescriptionBlur = (value, blur) => {
    if (!formFields || (!formFields.showTitle && !step.id)) {
      if (value.hasText()) {
        localChange(formName, 'showTitle', true);
      } else {
        localChange(formName, 'showTitle', false);
      }
    }
    blur(value);
  };
  if (!formValues || !formValues.type) {
    return <Field name="type" component={MediaTypeSelect} />;
  }

  return (
    <form onSubmit={handleSubmit} className="learning-step-form">
      <div className="learning-step-form_group">
        <span className="learning-step-form_mediatype-icon">
          <LearningPathStepIcon learningPathStepType={step.type} isCircle={false} />
        </span>

        <Field component="select" name="type" className="learning-step-form_mediatype-dd">
          <option value="INTRODUCTION">{polyglot.t('editPathStep.mediatype.introduction')}</option>
          <option value="TEXT">{polyglot.t('editPathStep.mediatype.text')}</option>
          <option value="MULTIMEDIA">{polyglot.t('editPathStep.mediatype.multimedia')}</option>
          <option value="QUIZ">{polyglot.t('editPathStep.mediatype.quiz')}</option>
          <option value="TASK">{polyglot.t('editPathStep.mediatype.task')}</option>
          <option value="SUMMARY">{polyglot.t('editPathStep.mediatype.summary')}</option>
        </Field>
      </div>

      <div className="learning-step-form_group">
        <Field
          name="license"
          className="learning-step-form_select"
          idKey="license"
          labelKey="description"
          options={licenseOptions}
          component={ObjectSelector}
        />
      </div>

      <div className="learning-step-form_group">
        <div className="learning-step-form_left">
          <span className="learning-step-form_icon-bg"><Icon.Create /></span>
          <Field name="showTitle" component={OnClickCheckbox} />
        </div>
        <div className="learning-step-form_right">
          <Field
            name="title"
            lang={lang}
            placeholder={polyglot.t('editPathStep.titlePlaceHolder')}
            wrapperClassName="learning-step-form_input learning-step-form_title"
            component={OneLineEditor}
          />
        </div>
      </div>
      <Field name="description" lang={lang} component={DescriptionHTMLEditor} onBlur={handleDescriptionBlur} />
      <div className="learning-step-form_group">
        <div className="learningsource-form">
          <div>
            <Field
              name="url"
              component={InputField}
              placeholder={polyglot.t('editPathStep.urlPlaceholder')}
              type="url"
              label={polyglot.t('editPathStep.urlLabel')}
              labelClassName="mediatype-menu__label"
            />
            <PreviewOembed content={embedContent} />
          </div>
        </div>
        {(formFields && (formFields.url || formFields.description)) && error && <span className="error_message error_message--red">{error}</span>}
        <div className="block-container_fixed block-container_fixed--bottom--right">
          <div className="button-group">
            <Link to={abortUrl} className="button button--secondary">
              <LabeledIcon.Clear labelText={polyglot.t('editPage.cancelBtn')} />
            </Link>
            <button disabled={submitting || !valid} className="button button--primary" type="submit">
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
  step: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  learningPathId: PropTypes.number.isRequired,
  oembedPreview: PropTypes.array,
  validateOembedUrl: PropTypes.func.isRequired,
  licenseOptions: PropTypes.array.isRequired,
  formValues: PropTypes.object,
  formFields: PropTypes.object,
  localChange: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
};


const mapStateToProps = (state, props) => ({
  oembedPreview: state.oembedPreview.oembedContent,
  formValues: state.form[formName] ? state.form['learning-path-step'].values : undefined,
  formFields: state.form[formName] ? state.form['learning-path-step'].fields : undefined,
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
  localChange: (form, field, value) => change(form, field, value),
};

const asyncValidate = (values, dispatch, props) => {
  const { validateOembedUrl, lang } = props;
  return validateOembedUrl(values.url, lang);
};

const validate = createValidator({
  title: required(),
  _error: oneOfIsRequired('editPathStep.validation.oneOfDescriptionOrUrlIsRequired', 'url', 'description'),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: formName,
    asyncValidate,
    validate,
    asyncBlurFields: ['url'],
  })
)(LearningPathStepForm);
