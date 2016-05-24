import React, { PropTypes } from 'react';
import Icon from '../Icon';
import polyglot from '../../i18n';

export default function MediaTypeSelect({value, onChange}) {
  const changeType = (evt) => onChange(evt.target.value);

  const fieldNameAttr = 'step_media_type';
  const fieldIdAttr = name => `${fieldNameAttr}_${name}`;

  return (
    <div className="icon-select">
      <div className="icon-select_item">
        <input
          type="radio" className="icon-select_input"
          id={fieldIdAttr('introduction')} name={fieldNameAttr}
          value="INTRODUCTION" checked={value === 'INTRODUCTION'} onChange={changeType}
        />
        <label htmlFor={fieldIdAttr('introduction')} className="icon-select_label">
          <Icon.TypeText />
          <span className="icon-select_label-text">{polyglot.t('editPathStep.mediatype.introduction')}</span>
        </label>
      </div>
      <div className="icon-select_item">
        <input
          type="radio" className="icon-select_input"
          id={fieldIdAttr('text')} name={fieldNameAttr}
          value="TEXT" checked={value === 'TEXT'} onChange={changeType}
        />
        <label htmlFor={fieldIdAttr('text')} className="icon-select_label">
          <Icon.TypeText />
          <span className="icon-select_label-text">{polyglot.t('editPathStep.mediatype.text')}</span>
        </label>
      </div>
      <div className="icon-select_item">
        <input
          type="radio" className="icon-select_input"
          id={fieldIdAttr('video')} name={fieldNameAttr}
          value="MULTIMEDIA" checked={value === 'MULTIMEDIA'} onChange={changeType}
        />
        <label htmlFor={fieldIdAttr('video')} className="icon-select_label">
          <Icon.TypeMedia />
          <span className="icon-select_label-text">{polyglot.t('editPathStep.mediatype.multimedia')}</span>
        </label>
      </div>
      <div className="icon-select_item">
        <input
          type="radio" className="icon-select_input"
          id={fieldIdAttr('quiz')} name={fieldNameAttr}
          value="QUIZ" checked={value === 'QUIZ'} onChange={changeType}
        />
        <label htmlFor={fieldIdAttr('quiz')} className="icon-select_label">
          <Icon.TypeQuiz />
          <span className="icon-select_label-text">{polyglot.t('editPathStep.mediatype.quiz')}</span>
        </label>
      </div>
      <div className="icon-select_item">
        <input
          type="radio" className="icon-select_input"
          id={fieldIdAttr('task')} name={fieldNameAttr}
          value="TASK" checked={value === 'TASK'} onChange={changeType}
        />
        <label htmlFor={fieldIdAttr('task')} className="icon-select_label">
          <Icon.TypeTask />
          <span className="icon-select_label-text">{polyglot.t('editPathStep.mediatype.task')}</span>
        </label>
      </div>
      <div className="icon-select_item">
        <input
          type="radio" className="icon-select_input"
          id={fieldIdAttr('summary')} name={fieldNameAttr}
          value="SUMMARY" checked={value === 'SUMMARY'} onChange={changeType}
        />
        <label htmlFor={fieldIdAttr('summary')} className="icon-select_label">
          <Icon.TypeSummary />
          <span className="icon-select_label-text">{polyglot.t('editPathStep.mediatype.summary')}</span>
        </label>
      </div>
    </div>
  );
}

MediaTypeSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
};
