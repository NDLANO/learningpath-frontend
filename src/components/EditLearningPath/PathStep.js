import React, { Component, PropTypes } from 'react';
import { titleI18N, descriptionI18N, embedUrlI18N } from '../../util/i18nFieldFinder';
import Icon from '../Icon';

export default class PathStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: props.step,
      lang: props.lang
    };
  }

  handleTypeChange(evt) {
    let step = Object.assign({}, this.state.step, {
      type: evt.target.value
    });

    this.setState({ step }, this.notifyOnChange);
  }

  handleEmbedUrlChange(evt) {
    let lang = this.state.lang;
    let step = Object.assign({}, this.state.step);
    step.embedUrl.forEach(embedUrl => {
      if (embedUrl.language === lang) {
        embedUrl.url = evt.target.value;
      }
    });

    this.setState({ step }, this.notifyOnChange);
  }

  notifyOnChange() {
    this.props.onChange(this.state.step);
  }

  render() {
    let { step, lang } = this.state;
    let title = titleI18N(step, lang);
    let htmlDescription = descriptionI18N(step, lang);
    let embedUrl = embedUrlI18N(step, lang);

    const fieldNameAttr = `step_${step.seqNo}_type`;
    const fieldIdAttr = value => `${fieldNameAttr}_type_${value}`;
    const changeType = this.handleTypeChange.bind(this);
    const changeEmbedUrl = this.handleEmbedUrlChange.bind(this);

    let embedUrlPreview = '';
    /*
    if (embedUrl) {
      embedUrlPreview = (
        <div className='learningsource--wrapper'>
          <iframe className='learningsource__frame' src={embedUrl} frameBorder='0'></iframe>
          <a className='learningsource__expand' href='#'>
            <span className='button button--outline'>Forhåndsvis hele artikkelen</span>
          </a>
        </div>
      );
    }
    */

    return (
      <div className='learning-path-step'>
        <div className='learning-path_hd'>
         <h1 className='learing-path_title'>{title}</h1>
        </div>
        <div className='learning-path_bd'>
          <div dangerouslySetInnerHTML={{__html: htmlDescription}}></div>

          <div className='mediatype-wrapper'>
            <div className='icon-select'>
              <div className='icon-select_item'>
                <input type='radio' className='icon-select_input'
                    id={fieldIdAttr('text')} name={fieldNameAttr}
                    value='TEXT' checked={step.type==='TEXT'} onChange={changeType} />
                <label htmlFor={fieldIdAttr('text')} className='icon-select_label'>
                  <Icon.TypeText />
                  <span className='icon-select_label-text'>Teori</span>
                </label>
              </div>
              <div className='icon-select_item'>
                <input type='radio' className='icon-select_input'
                    id={fieldIdAttr('video')} name={fieldNameAttr}
                    value='VIDEO' checked={step.type==='VIDEO'} onChange={changeType} />
                <label htmlFor={fieldIdAttr('video')} className='icon-select_label'>
                  <Icon.TypeMedia />
                  <span className='icon-select_label-text'>Video</span>
                </label>
              </div>
              <div className='icon-select_item'>
                <input type='radio' className='icon-select_input'
                    id={fieldIdAttr('quiz')} name={fieldNameAttr}
                    value='QUIZ' checked={step.type==='QUIZ'} onChange={changeType} />
                <label htmlFor={fieldIdAttr('quiz')} className='icon-select_label'>
                  <Icon.TypeQuiz />
                  <span className='icon-select_label-text'>Quiz</span>
                </label>
              </div>
              <div className='icon-select_item'>
                <input type='radio' className='icon-select_input'
                    id={fieldIdAttr('task')} name={fieldNameAttr}
                    value='TASK' checked={step.type==='TASK'} onChange={changeType} />
                <label htmlFor={fieldIdAttr('task')} className='icon-select_label'>
                  <Icon.TypeTask />
                  <span className='icon-select_label-text'>Oppgave</span>
                </label>
              </div>
              <div className='icon-select_item'>
                <input type='radio' className='icon-select_input'
                    id={fieldIdAttr('summary')} name={fieldNameAttr}
                    value='SUMMARY' checked={step.type==='SUMMARY'} onChange={changeType} />
                <label htmlFor={fieldIdAttr('summary')} className='icon-select_label'>
                  <Icon.TypeSummary />
                  <span className='icon-select_label-text'>Oppsummering</span>
                </label>
              </div>
            </div>
            <div className='learningsourde-from'>
              <div>
                <label className='mediatype-menu__label'>Lim in lenke (URL) fra ndla.no eller youtube.com</label>
                <input type='url' style={{display: 'inline-block', width: '100%'}}
                    value={embedUrl} onChange={changeEmbedUrl}
                    placeholder='Lim in lenke' />
                {embedUrlPreview}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PathStep.propTypes = {
  onChange: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired
};
