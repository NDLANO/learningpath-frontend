/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { oembedContentI18N } from '../../../util/i18nFieldFinder';
import DescriptionHTMLEditor from '../../../common/editors/DescriptionHTMLEditor';
import MediaTypeSelect from './MediaTypeSelect';
import polyglot from '../../../i18n';
import Icon from '../../../common/Icon';
import OnClickCheckbox from './OnClickCheckbox';
import OneLineEditor from '../../../common/editors/OneLineEditor';
import ObjectSelector from '../../../common/form/ObjectSelector';
import PreviewOembed from '../oembed/PreviewOembed';
import LearningPathStepIcon from '../LearningPathStepIcon';
import InputField from '../../../common/form/InputField';

const LearningPathStepFields = (props) => {
  const {
    step,
    error,
    lang,
    licenseOptions,
    oembedPreview,
    type,
    showTitle,
    description,
    title,
    url,
  } = props;

  const embedContent = oembedContentI18N({ embedUrl: oembedPreview }, lang);
  const handleDescriptionBlur = (value) => {
    if ((!showTitle.meta.touched && !step.id)) {
      if (value.hasText()) {
        showTitle.input.onChange(true);
      } else {
        showTitle.input.onChange(false);
      }
    }
    description.input.onBlur(value);
  };

  if (!type.input.value) {
    return <MediaTypeSelect {...type} />;
  }
  return (
    <div>
      <div className="learning-step-form_group">
        <span className="learning-step-form_mediatype-icon">
          <LearningPathStepIcon learningPathStepType={type.input.value} isCircle={false} />
        </span>

        <select {...type.input} name="type" className="learning-step-form_mediatype-dd">
          <option value="INTRODUCTION">{polyglot.t('editPathStep.mediatype.introduction')}</option>
          <option value="TEXT">{polyglot.t('editPathStep.mediatype.text')}</option>
          <option value="MULTIMEDIA">{polyglot.t('editPathStep.mediatype.multimedia')}</option>
          <option value="QUIZ">{polyglot.t('editPathStep.mediatype.quiz')}</option>
          <option value="TASK">{polyglot.t('editPathStep.mediatype.task')}</option>
          <option value="SUMMARY">{polyglot.t('editPathStep.mediatype.summary')}</option>
        </select>
      </div>

      <div className="learning-step-form_group">
        <Field
          name="license"
          className="learning-step-form_select"
          idKey="license"
          labelKey="description"
          options={licenseOptions}
          component={ObjectSelector}
        />
      </div>

      <div className="learning-step-form_group">
        <div className="learning-step-form_left">
          <span className="learning-step-form_icon-bg"><Icon.Create /></span>
          <OnClickCheckbox input={showTitle.input} />
        </div>
        <div className="learning-step-form_right">
          <OneLineEditor placeholder={polyglot.t('editPathStep.titlePlaceHolder')} wrapperClassName="learning-step-form_input learning-step-form_title" {...title} />
        </div>
      </div>
      <DescriptionHTMLEditor input={description.input} lang={lang} onBlur={handleDescriptionBlur} />
      <div className="learning-step-form_group">
        <div className="learningsource-form">
          <div>
            <Field
              name="url"
              component={InputField}
              placeholder={polyglot.t('editPathStep.urlPlaceholder')}
              type="url"
              label={polyglot.t('editPathStep.urlLabel')}
              labelClassName="mediatype-menu__label"
            />
            <PreviewOembed content={embedContent} />
          </div>
        </div>
        {(url.meta.touched || description.meta.touched) && error && <span className="error_message error_message--red">{error}</span>}
      </div>
    </div>
  );
};


LearningPathStepFields.propTypes = {
  lang: PropTypes.string.isRequired,
  error: PropTypes.string,
  step: PropTypes.object.isRequired,
  oembedPreview: PropTypes.array,
  licenseOptions: PropTypes.array.isRequired,
  description: PropTypes.object.isRequired,
  type: PropTypes.object.isRequired,
  showTitle: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  title: PropTypes.object.isRequired,
};
