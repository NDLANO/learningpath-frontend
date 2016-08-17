/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import polyglot from '../../i18n';
import ObjectSelector from '../../common/form/ObjectSelector';

const fields = ['title', 'description', 'license'];

class CreateLearningPath extends React.Component {


  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(reset('create-learning-path'));
  }
  render() {
    const {
      fields: { title, description, license },
      submitting,
      handleSubmit,
      licenseOptions,
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <h1>{polyglot.t('createLearningPath.createNew')}</h1>
        <div>
          <label htmlFor="title">{polyglot.t('createLearningPath.title')}</label>
          <input id="title" type="text" required {...title} />
        </div>
        <div>
          <label htmlFor="description">{polyglot.t('createLearningPath.description')}</label>
          <textarea id="description" rows="4" cols="50" placeholder={polyglot.t('createLearningPath.descriptionPlaceholder')} maxLength="150" className="textarea" {...description} />
          <p className="learning-path_input-information">{polyglot.t('createLearningPath.descriptionMaxLength')}</p>
        </div>
        <div>
          <label htmlFor="license">Lisens</label>
          <ObjectSelector idKey="license" labelKey="description" options={licenseOptions} {...license} />
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
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  licenseOptions: PropTypes.array.isRequired,
};

export default reduxForm({
  form: 'create-learning-path',
  fields,
})(CreateLearningPath);
