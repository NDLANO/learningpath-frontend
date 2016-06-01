import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { titleI18N, descriptionI18N, oembedUrlI18N, oembedContentI18N } from '../../util/i18nFieldFinder';
import { createValidator, required, oneOfIsRequired } from '../../util/validation';
import LabeledIcon from '../LabeledIcon';
import DescriptionHTMLEditor from '../editors/DescriptionHTMLEditor';
import MediaTypeSelect from './MediaTypeSelect';
import polyglot from '../../i18n';
import Icon from '../Icon';
import OneLineEditor from '../editors/OneLineEditor';

import PreviewOembed from './PreviewOembed';
import LearningPathStepIcon from '../LearningPathStepIcon';
import {
  validateOembed,
} from '../../actions';


const LearningPathStepForm = (props) => {
  const {
    step,
    lang,
    oembedPreview,
    error,
    fields: { title, description, type, url },
    handleSubmit,
    submitting,
    learningPathId,
  } = props;

  const embedContent = oembedContentI18N({embedContent: oembedPreview}, lang);

  const abortUrl = step.id ? `/learningpaths/${learningPathId}/step/${step.id}` : `/learningpaths/${learningPathId}`;

  if (!type.value) {
    return <MediaTypeSelect {...type} />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="learning-step_hd">
        <span className="mediatype-icon">
          <LearningPathStepIcon learningPathStepType={type.value} isCircle={false} />
        </span>
        <select className="mediatype-dd" {...type} >
          <option value="INTRODUCTION">{polyglot.t('editPathStep.mediatype.introduction')}</option>
          <option value="TEXT">{polyglot.t('editPathStep.mediatype.text')}</option>
          <option value="MULTIMEDIA">{polyglot.t('editPathStep.mediatype.multimedia')}</option>
          <option value="QUIZ">{polyglot.t('editPathStep.mediatype.quiz')}</option>
          <option value="TASK">{polyglot.t('editPathStep.mediatype.task')}</option>
          <option value="SUMMARY">{polyglot.t('editPathStep.mediatype.summary')}</option>
        </select>
      </div>
      <div className="learning-step_hd">
        <span className="editable"><Icon.Create /></span>
        <h1 className="learning-step-input learning-step-input__title">
          <OneLineEditor lang={lang} {...title} placeholder={polyglot.t('editPathStep.titlePlaceHolder')} />
        </h1>
        {title.touched && title.error && <span className="error_message error_message--red">{title.error}</span>}
      </div>
      <div className="learning-path_bd">
        <div>
          <DescriptionHTMLEditor
            lang={lang}
            {...description}
          />
        </div>
        <div className="learningsource-form">
          <div>
            <label className="mediatype-menu__label">{polyglot.t('editPathStep.urlLabel')}</label>
            <input
              type="url"
              {...url}
              placeholder={polyglot.t('editPathStep.urlPlaceholder')}
            />
            {url.touched && url.error && <span className="error_message error_message--red">{url.error}</span>}
            <PreviewOembed content={embedContent} />
          </div>
        </div>
        {(url.touched || description.touched) && error && <span className="error_message error_message--red">{error}</span>}
        <div className="block-container_fixed block-container_fixed--bottom--right">
          <div className="button-group">
            <Link to={abortUrl} className="button button--secondary">
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
};

LearningPathStepForm.propTypes = {
  lang: PropTypes.string.isRequired,
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  step: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  learningPathId: PropTypes.number.isRequired,
  oembedPreview: PropTypes.array.isRequired,
  validateOembedUrl: PropTypes.func.isRequired
};


const mapStateToProps = (state, props) => ({
  oembedPreview: state.oembedPreview.oembedContent,
  initialValues: {
    title: titleI18N(props.step, props.lang),
    description: descriptionI18N(props.step, props.lang),
    url: oembedUrlI18N(props.step, props.lang),
    type: props.step.type
  }
});

const mapDispatchToProps = {
  validateOembedUrl: (embedContent, lang) => validateOembed(embedContent, lang)
};


const asyncValidate = (values, dispatch, props) => {
  const { validateOembedUrl, lang } = props;
  return validateOembedUrl(values.url, lang);
};

const validate = createValidator({
  title: required(),
  _error: oneOfIsRequired('editPathStep.validation.oneOfDescriptionOrUrlIsRequired', 'url', 'description')
});

export default reduxForm({
  form: 'learning-path-step',
  fields: ['title', 'description', 'url', 'type'],
  asyncValidate,
  validate,
  asyncBlurFields: ['url'],
}, mapStateToProps, mapDispatchToProps)(LearningPathStepForm);
