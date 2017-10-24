/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import defined from 'defined';
import { reduxForm, Fields } from 'redux-form';
import { createValidator, required, oneOfIsRequired, licenseExistsIfDescriptionExists } from '../../../util/validation';
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
    learningPath,
    licenseOptions,
    valid,
  } = props;

  const abortUrl = step.id ? `/learningpaths/${learningPath.id}/step/${step.id}` : `/learningpaths/${learningPath.id}`;
  console.log(props);
  return (
    <form onSubmit={handleSubmit} className="learning-step-form">
      <div className="learning-step-form_group">
        <Fields
          names={['type', 'title', 'showTitle', 'url', 'description', 'license']}
          component={LearningPathStepFields}
          step={step}
          learningPathId={learningPath.id}
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
  learningPath: PropTypes.object.isRequired,
  oembedPreview: PropTypes.object,
  validateOembedUrl: PropTypes.func.isRequired,
  licenseOptions: PropTypes.array.isRequired,
  valid: PropTypes.bool.isRequired,
};


const mapStateToProps = (state, props) => ({
  oembedPreview: getI18NEmbedContent(state),
  initialValues: {
    showTitle: defined(props.step.showTitle, false),
    title: props.step.title,
    description: props.step.description,
    url: { url: props.step.embedUrl ? defined(props.step.embedUrl.url, '') : '', embedType: props.step.embedUrl ? defined(props.step.embedUrl.embedType, 'oembed') : '' },
    type: props.learningPath.learningsteps && props.learningPath.learningsteps.length > 0 ? props.step.type : 'INTRODUCTION',
    license: defined(props.step.license, ''),
  },
});

const mapDispatchToProps = {
  validateOembedUrl: (embedContent, lang, embedType) => validateOembed(embedContent, lang, embedType),
};

const asyncValidate = (values, dispatch, props) => {
  const { validateOembedUrl, lang } = props;
  return validateOembedUrl(values.url.url, lang, values.url.embedType);
};

const validate = createValidator({
  title: required(),
  url: oneOfIsRequired('editPathStep.validation.oneOfDescriptionOrUrlIsRequired', 'url', 'description'),
  description: licenseExistsIfDescriptionExists('editPathStep.validation.licenseAndDescription', 'description', 'license'),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: formName,
    validate,
    asyncBlurFields: ['url'],
    asyncValidate,
    shouldAsyncValidate: () => true,
    enableReinitialize: true,
  })
)(LearningPathStepForm);
