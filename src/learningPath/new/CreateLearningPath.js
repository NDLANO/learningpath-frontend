import React, { PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import polyglot from '../../i18n';

const fields = ['title', 'description'];

class CreateLearningPath extends React.Component {


  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(reset('create-learning-path'));
  }
  render() {
    const {
      fields: { title, description },
      submitting,
      handleSubmit,
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <h1>{polyglot.t('createLearningPath.createNew')}</h1>
        <div>
          <label>{polyglot.t('createLearningPath.title')}</label>
          <input type="text" required {...title} />
        </div>
        <div>
          <label>{polyglot.t('createLearningPath.description')}</label>
          <textarea rows="4" cols="50" placeholder={polyglot.t('createLearningPath.descriptionPlaceholder')} maxLength="150" className="textarea" {...description} />
        </div>
        <p className="hint-text">{polyglot.t('createLearningPath.descriptionMaxLength')}</p>
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
};

export default reduxForm({
  form: 'create-learning-path',
  fields,
})(CreateLearningPath);
