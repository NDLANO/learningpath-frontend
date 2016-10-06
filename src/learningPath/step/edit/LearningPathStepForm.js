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
import { titleI18N, descriptionI18N, oembedUrlI18N } from '../../../util/i18nFieldFinder';
import { createValidator, required, oneOfIsRequired } from '../../../util/validation';
import LabeledIcon from '../../../common/LabeledIcon';
import polyglot from '../../../i18n';
import LearningPathStepFields from './LearningPathStepFields';
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
  oembedPreview: PropTypes.array,
  validateOembedUrl: PropTypes.func.isRequired,
  licenseOptions: PropTypes.array.isRequired,
  localChange: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
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
