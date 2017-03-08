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
import defined from 'defined';
import { Link } from 'react-router';
import isInteger from 'lodash/isInteger';
import { reduxForm, Field } from 'redux-form';
import LabeledIcon from '../../common/LabeledIcon';
import TagsInput from '../../common/TagsInput';
import InputField from '../../common/form/InputField';
import LearningPathDescription from './LearningPathDescription';
import ObjectSelector from '../../common/form/ObjectSelector';
import Contributors from './copyright/Contributors';
import polyglot from '../../i18n';
import LearningPathDuration from './LearningPathDuration';
import LearningPathImage from './LearningPathImage';
import SubmitButton from '../../common/buttons/SubmitButton';

const formName = 'edit-learning-path';
const validate = (values) => {
  const errors = {};
  if (!values.description) {
    errors.description = polyglot.t('errors.description');
  }

  if (!values.title) {
    errors.title = polyglot.t('errors.title');
  }
  if (!values.duration) {
    errors.duration = polyglot.t('errors.duration');
  } else if (!values.duration && !isNaN(values.duration)) {
    errors.duration = polyglot.t('errors.duration');
  } else if (values.duration <= 0) {
    errors.duration = polyglot.t('errors.durationMinus');
  } else if (values.duration && isNaN(values.duration.replace(/,/g, '.')) && isNaN(values.duration)) {
    errors.duration = polyglot.t('errors.durationNaN');
  } else if (values.duration && !(/^\d+(\.|,)?\d{0,2}$/.test(values.duration.toString()))) {
    errors.duration = polyglot.t('errors.durationDecimals');
  }
  return errors;
};

const LearningPathForm = (props) => {
  const {
    tagOptions,
    handleSubmit,
    submitting,
    valid,
    learningPath,
    lang,
    localFetchImages,
    fetchImage,
    licenseOptions,
    formValues,
  } = props;

  const learningPathTitle = defined(formValues.title, '');
  return (
    <form className="learning-path-form" onSubmit={handleSubmit}>
      <div className="learning-path_hd">
        <h1>{polyglot.t('learningPath.pageName')}</h1>
        <div className="learning-path-input learning-path-input__title">
          <Field
            name="title"
            id="title"
            component={InputField}
            type="text" lang={lang}
            label={polyglot.t('learningPath.title')}
            labelClassName="label--medium-bold label--medium"
            maxLength="75"
          />
          <p className="learning-path_input-information">{polyglot.t('createLearningPath.titleMaxLength')}</p>
        </div>
      </div>

      <div className="learning-path_bd">
        <div className="learning-path-input learning-path-input__paragraph">
          <Field name="description" component={LearningPathDescription} />
        </div>

        <Field name="coverPhotoMetaUrl" component={LearningPathImage} localFetchImages={localFetchImages} learningPathTitle={learningPathTitle} fetchImage={fetchImage} />

        <div className="learning-path-duration">
          <label htmlFor="duration" className="label--medium-bold  label--medium">{polyglot.t('learningPath.duration')}</label>
          <Field name="duration" component={LearningPathDuration} id="duration" />
        </div>

        <div className="learning-path-tags">
          <label htmlFor="tags" className="label--medium-bold  label--medium">{polyglot.t('learningPath.tags')}</label>
          <Field name="tags" component={TagsInput} id="tags" tagOptions={tagOptions} />
        </div>

        <div className="learningPath-contributors">
          <label htmlFor="license" className="label--medium-bold  label--medium">{polyglot.t('learningPath.copyright.contributors')}</label>
          <Field name="contributors" component={Contributors} id="contributors" />
        </div>

        <div className="learningPath-copyright">
          <label htmlFor="license" className="label--medium-bold  label--medium">{polyglot.t('learningPath.copyright.license')}</label>
          <Field name="license" component={ObjectSelector} idKey="license" labelKey="description" options={licenseOptions} />
        </div>

        <div className="block-container_fixed block-container_fixed--bottom--right">
          <div className="button-group">
            <Link to={`/learningpaths/${learningPath.id}`} className="button button--secondary">
              <LabeledIcon.Clear labelText={polyglot.t('editPage.cancelBtn')} />
            </Link>
            <SubmitButton disabled={submitting || !valid} className="button button--primary">
              <LabeledIcon.Save labelText={polyglot.t('editPage.savePathBtn')} />
            </SubmitButton>
          </div>
        </div>
      </div>
    </form>
  );
};

LearningPathForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  learningPath: PropTypes.object.isRequired,
  tagOptions: PropTypes.array.isRequired,
  lang: PropTypes.string.isRequired,
  localFetchImages: PropTypes.func.isRequired,
  fetchImage: PropTypes.func.isRequired,
  licenseOptions: PropTypes.array.isRequired,
  formValues: PropTypes.object.isRequired,
};

const convertedDuration = (value) => {
  if (!value) {
    return undefined;
  }
  const hours = value / 60;
  return !isInteger(hours) ? (hours).toFixed(2).toString() : (hours).toString();
};

const mapStateToProps = (state, props) => ({
  initialValues: {
    title: props.learningPath.title,
    description: props.learningPath.description,
    duration: convertedDuration(props.learningPath.duration),
    tags: props.learningPath.tags,
    coverPhotoMetaUrl: props.learningPath.coverPhoto ? props.learningPath.coverPhoto.metaUrl : '',
    license: props.learningPath.copyright && props.learningPath.copyright.license ? defined(props.learningPath.copyright.license, '') : '',
    contributors: props.learningPath.copyright && props.learningPath.copyright.contributors ? props.learningPath.copyright.contributors : [],
  },
  formValues: state.form[formName] && state.form[formName].values ? state.form[formName].values : {},
});

export default compose(
  connect(mapStateToProps),
  reduxForm({
    form: formName,
    validate,
  })
)(LearningPathForm);
