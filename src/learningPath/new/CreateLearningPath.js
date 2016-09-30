/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { reduxForm, reset, Field } from 'redux-form';
import polyglot from '../../i18n';
import ObjectSelector from '../../common/form/ObjectSelector';

class CreateLearningPath extends React.Component {

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(reset('create-learning-path'));
  }
  render() {
    const {
      submitting,
      handleSubmit,
      licenseOptions,
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <h1>{polyglot.t('createLearningPath.createNew')}</h1>
        <div>
          <Field
            name="title"
            id="title"
            type="text"
            component="input"
          />
        </div>
        <div>
          <label htmlFor="description">{polyglot.t('createLearningPath.description')}</label>
          <Field
            id="description"
            rows="4"
            cols="50"
            name="description"
            placeholder={polyglot.t('createLearningPath.descriptionPlaceholder')}
            maxLength="150"
            className="textarea"
            component="textarea"
          />
          <p className="learning-path_input-information">{polyglot.t('createLearningPath.descriptionMaxLength')}</p>
        </div>
        <div>
          <label htmlFor="license">Lisens</label>
          <Field
            name="license"
            idKey="license"
            labelKey="description"
            options={licenseOptions}
            component={ObjectSelector}
          />
          <p className="learning-path_input-information">{polyglot.t('createLearningPath.descriptionMaxLength')}</p>
        </div>
        <button className="button cta-link cta-link--block" disabled={submitting} type="submit">
          {polyglot.t('createLearningPath.createButton')}
        </button>
      </form>
    );
  }
}

CreateLearningPath.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  licenseOptions: PropTypes.array.isRequired,
};

export default reduxForm({
  form: 'create-learning-path',
})(CreateLearningPath);
