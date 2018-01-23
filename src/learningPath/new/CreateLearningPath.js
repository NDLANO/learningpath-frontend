/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { reduxForm, reset, Field } from 'redux-form';
import polyglot from '../../i18n';
import InputField from '../../common/form/InputField';
import TextAreaField from '../../common/form/TextAreaField';
import { createValidator, required } from '../../util/validation';

class CreateLearningPath extends React.Component {
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(reset('create-learning-path'));
  }
  render() {
    const { submitting, handleSubmit, valid } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Helmet title={polyglot.t('createLearningPath.pageTitle')} />
        <h1>{polyglot.t('createLearningPath.createNew')}</h1>
        <div>
          <Field
            name="title"
            id="title"
            type="text"
            component={InputField}
            label={polyglot.t('createLearningPath.title')}
            maxLength="75"
          />
          <p className="learning-path_input-information">
            {polyglot.t('createLearningPath.titleMaxLength')}
          </p>
        </div>
        <div>
          <label htmlFor="description">
            {polyglot.t('createLearningPath.description')}
          </label>
          <Field
            id="description"
            rows="4"
            cols="50"
            name="description"
            placeholder={polyglot.t(
              'createLearningPath.descriptionPlaceholder',
            )}
            maxLength="150"
            className="textarea"
            component={TextAreaField}
            disableVerticalResize
          />
          <p className="learning-path_input-information">
            {polyglot.t('createLearningPath.descriptionMaxLength')}
          </p>
        </div>
        <br />
        <button
          className="button cta-link cta-link--block"
          disabled={submitting || !valid}
          type="submit">
          {polyglot.t('createLearningPath.createButton')}
        </button>
      </form>
    );
  }
}

const validate = createValidator({
  title: required('errors.title'),
  description: required('errors.description'),
});

CreateLearningPath.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'create-learning-path',
  validate,
})(CreateLearningPath);
