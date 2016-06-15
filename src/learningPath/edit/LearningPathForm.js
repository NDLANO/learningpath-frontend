import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import LabeledIcon from '../../components/LabeledIcon';
import { titleI18N, descriptionI18N } from '../../util/i18nFieldFinder';
import TagsInput from '../../common/TagsInput';
import polyglot from '../../i18n';
import classNames from 'classnames';
import { reduxForm } from 'redux-form';
import LearningPathDuration from './LearningPathDuration';
import isInteger from 'lodash/isInteger';
import Images from '../../image/Images';
import Lightbox from '../../components/Lightbox';
const fields = ['title', 'description', 'duration', 'tags', 'coverPhotoUrl'];

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


class LearningPathForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayImages: false
    };
  }
  render() {
    const {
      tagOptions,
      fields: { title, description, duration, tags, coverPhotoUrl },
      handleSubmit,
      submitting,
      learningPath,
      lang,
      onChoseImage
    } = this.props;


    const inputClassName = (hasError, isTextArea) => classNames({
      'input--alert': hasError,
      'textarea textarea--resize-vertical': isTextArea
    });


    const remainingDescriptionLength = description.value ? 150 - description.value.length : 150;
    const onImageLightboxClose = () => {
      this.setState({displayImages: false});
    };
    const onImageLightboxOpen = (evt) => {
      evt.preventDefault();
      onChoseImage();
      this.setState({displayImages: true});
    };
    console.log(coverPhotoUrl);
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
            <p className="learning-path_input-information">{polyglot.t('learningPath.descriptionInformation', {remainingDescriptionLength})}</p>
          </div>

          <div className="learning-path-image">
            <label className="label--medium-bold  label--medium">{polyglot.t('learningPath.image')}</label>
            <button className="button button--primary" onClick={(evt) => onImageLightboxOpen(evt)}>
              {polyglot.t('learningPath.imagePick')}
            </button>
            <p className="learning-path_input-information">{polyglot.t('learningPath.imageInformation')}</p>
          </div>
          <div className="lightbox_image-preview">
            <Lightbox display={this.state.displayImages} onClose={onImageLightboxClose}>
              <Images id="coverPhotoUrl" {...coverPhotoUrl} closeLightBox={onImageLightboxClose} />
            </Lightbox>
          </div>

          <div className="learning-path-duration">
            <label htmlFor="duration" className="label--medium-bold  label--medium">{polyglot.t('learningPath.duration')}</label>
            <LearningPathDuration id="duration" {...duration} />
            {duration.touched && duration.error && <span className="error_message error_message--red">{duration.error}</span>}
          </div>

          <div className="learning-path-tags">
            <label htmlFor="tags" className="label--medium-bold  label--medium">{polyglot.t('learningPath.tags')}</label>
            <TagsInput id="tags" tagOptions={tagOptions} lang={lang} {...tags} />
          </div>

          <div className="block-container_fixed block-container_fixed--bottom--right">
            <div className="button-group">
              <Link to={`/learningpaths/${learningPath.id}`} className="button button--secondary">
                <LabeledIcon.Clear labelText={polyglot.t('editPage.cancelBtn')} />
              </Link>
              <button disabled={submitting} className="button button--primary" type="submit">
                <LabeledIcon.Save labelText={polyglot.t('editPage.savePathBtn')} />
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

LearningPathForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  learningPath: PropTypes.object.isRequired,
  tagOptions: PropTypes.array.isRequired,
  lang: PropTypes.string.isRequired,
  onChoseImage: PropTypes.func.isRequired
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
    tags: props.learningPath.tags ? props.learningPath.tags : [],
    coverPhotoUrl: props.learningPath.coverPhotoUrl ? props.learningPath.coverPhotoUrl : ''
  },
});

export default reduxForm({
  form: 'edit-learning-path',
  fields,
  validate,
}, mapStateToProps)(LearningPathForm);
