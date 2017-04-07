/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import DescriptionHTMLEditor from '../../../common/editors/DescriptionHTMLEditor';
import polyglot from '../../../i18n';
import Icon from '../../../common/Icon';
import OnClickCheckbox from './OnClickCheckbox';
import InfoIconTooltip from './InfoIconTooltip';
import OneLineEditor from '../../../common/editors/OneLineEditor';
import ObjectSelector from '../../../common/form/ObjectSelector';
import PreviewOembed from '../oembed/PreviewOembed';
import LearningPathStepIcon from '../LearningPathStepIcon';
import LearningPathStepEmbed from './LearningPathStepEmbed';

const LearningPathStepFields = (props) => {
  const {
    step,
    lang,
    licenseOptions,
    oembedPreview,
    type,
    showTitle,
    description,
    title,
    url,
    learningPathId,
  } = props;

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

  const handleEmbedUrlChange = (embedUrl, embedType = 'oembed') => {
    url.input.onBlur({ url: embedUrl, embedType });
  };

  const handleUrlOnBlur = (evt) => {
    const value = evt.target.value;
    if (url.input.value.url !== value) {
      url.input.onBlur({ url: value, embedType: 'oembed' });
    }
  };
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
        <div className="learning-step-form_left">
          <InfoIconTooltip />
        </div>
        <div className="learning-step-form_right">
          <div className="learning-step-form_select">
            <Field
              name="license"
              idKey="license"
              labelKey="description"
              options={licenseOptions}
              component={ObjectSelector}
            />
          </div>
        </div>
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
        <LearningPathStepEmbed learningPathId={learningPathId} step={step} handleEmbedUrlChange={handleEmbedUrlChange} />
        <div className="learningsource-form">
          <div>
            <label className="mediatype-menu__label" htmlFor="url">{polyglot.t('editPathStep.urlLabel')}</label>
            <input name="url" onBlur={handleUrlOnBlur} onChange={handleUrlOnBlur} value={url.input.value.url} placeholder={polyglot.t('editPathStep.urlPlaceholder')} type="url" />
            {url.meta.touched && url.meta.error && <span className="error_message error_message--red">{url.meta.error}</span>}
            <PreviewOembed content={oembedPreview} />
          </div>
        </div>
        {(url.meta.touched || description.meta.touched) && description.meta.error && <span className="error_message error_message--red">{description.meta.error}</span>}
      </div>
    </div>
  );
};


LearningPathStepFields.propTypes = {
  lang: PropTypes.string.isRequired,
  error: PropTypes.string,
  step: PropTypes.object.isRequired,
  oembedPreview: PropTypes.object,
  licenseOptions: PropTypes.array.isRequired,
  description: PropTypes.object.isRequired,
  type: PropTypes.object.isRequired,
  showTitle: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  title: PropTypes.object.isRequired,
  learningPathId: PropTypes.number.isRequired,
};

export default LearningPathStepFields;
