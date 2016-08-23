/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import defined from 'defined';
import { Link } from 'react-router';
import isInteger from 'lodash/isInteger';
import classNames from 'classnames';
import { reduxForm } from 'redux-form';

import LabeledIcon from '../../common/LabeledIcon';
import { titleI18N, descriptionI18N, tagsI18N } from '../../util/i18nFieldFinder';
import TagsInput from '../../common/TagsInput';
import ObjectSelector from '../../common/form/ObjectSelector';
import Contributors from './copyright/Contributors';
import polyglot from '../../i18n';
import LearningPathDuration from './LearningPathDuration';
import LearningPathImage from './LearningPathImage';
import SubmitButton from '../../common/buttons/SubmitButton';

const fields = ['title', 'description', 'duration', 'tags', 'coverPhotoMetaUrl', 'license', 'contributors'];

const validate = values => {
  const errors = {};
  if (!values.description) {
    errors.description = polyglot.t('errors.description');
  }

  if (!values.title) {
    errors.title = polyglot.t('errors.title');
  }

  if (!values.duration && !isNaN(values.duration)) {
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
    fields: { title, description, duration, tags, coverPhotoMetaUrl, license, contributors },
    handleSubmit,
    submitting,
    learningPath,
    lang,
    localFetchImages,
    fetchImage,
    licenseOptions,
  } = props;

  const inputClassName = (hasError, isTextArea) => classNames({
    'input--alert': hasError,
    'textarea textarea--resize-vertical': isTextArea,
  });

  const remainingDescriptionLength = description.value ? 150 - description.value.length : 150;
  return (
    <form className="learning-path-form" onSubmit={handleSubmit}>
      <div className="learning-path_hd">
        <h1>{polyglot.t('learningPath.pageName')}</h1>
        <label htmlFor="title" className="label--medium-bold  label--medium">{polyglot.t('learningPath.title')}</label>
        <div className="learning-path-input learning-path-input__title">
          <input id="title" className={inputClassName(title.touched && title.error, false)} type="text" required{...title} lang={lang} />
          {title.touched && title.error && <span className="error_message error_message--red">{title.error}</span>}
        </div>
      </div>

      <div className="learning-path_bd">
        <label htmlFor="description" className="label--medium-bold  label--medium">{polyglot.t('learningPath.description')}</label>
        <div className="learning-path-input learning-path-input__paragraph">
          <textarea
            id="description"
            {...description} rows="4" cols="50"
            placeholder={polyglot.t('learningPath.descriptionPlaceholder')} maxLength="150"
            className={inputClassName(description.touched && description.error, true)}
          />
          {description.touched && description.error && <span className="error_message error_message--red">{description.error}</span>}
          <p className="learning-path_input-information">{polyglot.t('learningPath.descriptionInformation', { remainingDescriptionLength })}</p>
        </div>

        <LearningPathImage {...coverPhotoMetaUrl} localFetchImages={localFetchImages} learningPathTitle={title.value} fetchImage={fetchImage} />

        <div className="learning-path-duration">
          <label htmlFor="duration" className="label--medium-bold  label--medium">{polyglot.t('learningPath.duration')}</label>
          <LearningPathDuration id="duration" {...duration} />
          {duration.touched && duration.error && <span className="error_message error_message--red">{duration.error}</span>}
        </div>

        <div className="learning-path-tags">
          <label htmlFor="tags" className="label--medium-bold  label--medium">{polyglot.t('learningPath.tags')}</label>
          <TagsInput id="tags" tagOptions={tagOptions} {...tags} />
        </div>

        <div className="learningPath-contributors">
          <label htmlFor="license" className="label--medium-bold  label--medium">{polyglot.t('learningPath.copyright.contributors')}</label>
          <Contributors id="contributors" {...contributors} />
        </div>
        <div className="learningPath-copyright">
          <label htmlFor="license" className="label--medium-bold  label--medium">{polyglot.t('learningPath.copyright.license')}</label>
          <ObjectSelector idKey="license" labelKey="description" options={licenseOptions} {...license} />
        </div>
        <div className="block-container_fixed block-container_fixed--bottom--right">
          <div className="button-group">
            <Link to={`/learningpaths/${learningPath.id}`} className="button button--secondary">
              <LabeledIcon.Clear labelText={polyglot.t('editPage.cancelBtn')} />
            </Link>
            <SubmitButton disabled={submitting} className="button button--primary">
              <LabeledIcon.Save labelText={polyglot.t('editPage.savePathBtn')} />
            </SubmitButton>
          </div>
        </div>
      </div>
    </form>
  );
};

LearningPathForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  learningPath: PropTypes.object.isRequired,
  tagOptions: PropTypes.array.isRequired,
  lang: PropTypes.string.isRequired,
  localFetchImages: PropTypes.func.isRequired,
  fetchImage: PropTypes.func.isRequired,
  licenseOptions: PropTypes.array.isRequired,
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
    title: titleI18N(props.learningPath, props.lang),
    description: descriptionI18N(props.learningPath, props.lang),
    duration: convertedDuration(props.learningPath.duration),
    tags: defined(tagsI18N(props.learningPath, props.lang), []),
    coverPhotoMetaUrl: props.learningPath.coverPhoto ? props.learningPath.coverPhoto.metaUrl : '',
    license: props.learningPath.copyright && props.learningPath.copyright.license ? props.learningPath.copyright.license : '',
    contributors: props.learningPath.copyright && props.learningPath.copyright.contributors ? props.learningPath.copyright.contributors : [],

  },
});

export default reduxForm({
  form: 'edit-learning-path',
  fields,
  validate,
}, mapStateToProps)(LearningPathForm);
