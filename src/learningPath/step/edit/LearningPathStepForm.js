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
import { reduxForm, Fields, change } from 'redux-form';
import { createValidator, required, oneOfIsRequired } from '../../../util/validation';
import LabeledIcon from '../../../common/LabeledIcon';
import polyglot from '../../../i18n';
import LearningPathStepFields from './LearningPathStepFields';
import { validateOembed } from './validateOembedActions';
import { getI18NEmbedContent } from '../learningPathStepSelectors';

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
    valid,
  } = props;

  const abortUrl = step.id ? `/learningpaths/${learningPathId}/step/${step.id}` : `/learningpaths/${learningPathId}`;
  return (
    <form onSubmit={handleSubmit} className="learning-step-form">
      <div className="learning-step-form_group">
        <Fields
          names={['type', 'title', 'showTitle', 'url', 'description']}
          component={LearningPathStepFields}
          step={step}
          learningPathId={learningPathId}
          error={error}
          lang={lang}
          licenseOptions={licenseOptions}
          oembedPreview={oembedPreview}
        />
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
  oembedPreview: PropTypes.object,
  validateOembedUrl: PropTypes.func.isRequired,
  licenseOptions: PropTypes.array.isRequired,
  localChange: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
};


const mapStateToProps = (state, props) => ({
  oembedPreview: getI18NEmbedContent(state),
  initialValues: {
    showTitle: defined(props.step.showTitle, false),
    title: props.step.title,
    description: props.step.description,
    url: { url: defined(props.step.embedUrl.url, ''), embedType: props.step.embedUrl.embedType },
    type: props.step.type,
    license: defined(props.step.license, ''),
  },
});

const mapDispatchToProps = {
  validateOembedUrl: (embedContent, lang, embedType) => validateOembed(embedContent, lang, embedType),
  localChange: (form, field, value) => change(form, field, value),
};

const asyncValidate = (values, dispatch, props) => {
  const { validateOembedUrl, lang } = props;
  return validateOembedUrl(values.url.url, lang, values.url.embedType);
};

const validate = createValidator({
  title: required(),
  description: oneOfIsRequired('editPathStep.validation.oneOfDescriptionOrUrlIsRequired', 'url', 'description'),
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
