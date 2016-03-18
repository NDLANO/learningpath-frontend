import React, { Component, PropTypes } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import assign from 'lodash/assign';
import findIndex from 'lodash/findIndex';
import { titleI18N, descriptionI18N, embedUrlI18N } from '../../util/i18nFieldFinder';
import Icon from '../Icon';
import TitleEditor from './TitleEditor';



export default class PathStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: props.step,
      lang: props.lang
    };
  }

  handleTitleChange(value) {
    let step = cloneDeep(this.state.step);
    let titles = get(step, 'title', []);
    let index = findIndex(titles, ['language', value.language]);

    if (index === -1) {
      titles.push(value);
    } else {
      assign(titles[index], value);
    }

    step.title = titles;

    this.setState({ step });
  }


  handleTypeChange(evt) {
    let step = cloneDeep(this.state.step);

    Object.assign(step, { type: evt.target.value });

    this.setState({ step });
  }

  handleEmbedUrlChange(evt) {
    let value = {
      url: evt.target.value,
      language: this.state.lang
    };

    let step = cloneDeep(this.state.step);
    let embedUrls = get(step, 'embedUrl', []);
    let index = findIndex(embedUrls, ['language', value.language]);

    if (index === -1) {
      embedUrls.push(value);
    } else {
      assign(embedUrls[index], value);
    }

    step.embedUrl = embedUrls;

    this.setState({ step });
  }

  isValid() {
    return true;
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if ( this.isValid() ) {
      this.props.onSubmit(this.state.step);
    }
  }

  render() {
    let { step, lang } = this.state;
    let title = titleI18N(step, lang);
    let htmlDescription = descriptionI18N(step, lang);
    let embedUrl = embedUrlI18N(step, lang);

    const fieldNameAttr = `step_${step.seqNo}_type`;
    const fieldIdAttr = value => `${fieldNameAttr}_type_${value}`;
    const changeTitle = this.handleTitleChange.bind(this);
    const changeType = this.handleTypeChange.bind(this);
    const changeEmbedUrl = this.handleEmbedUrlChange.bind(this);
    const handleSubmit = this.handleSubmit.bind(this);

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

    let embedSourceInput = '';

    if (step.type) {
      embedSourceInput =(
        <div className='learningsource-form'>
          <div>
            <label className='mediatype-menu__label'>Lim in lenke (URL) fra ndla.no eller youtube.com</label>
            <input type='url' style={{display: 'inline-block', width: '100%'}}
                value={embedUrl} onChange={changeEmbedUrl}
                placeholder='Lim in lenke' />
            {embedUrlPreview}
          </div>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className='learning-path-step'>
        <div className='learning-path_hd'>
          <h1 className='learing-path_title'>
            <TitleEditor lang={lang} value={title} onChange={changeTitle} />
          </h1>
        </div>
        <div className='learning-path_bd'>
          <div dangerouslySetInnerHTML={{__html: htmlDescription}}></div>

          <div className='mediatype-wrapper'>
            <div className='icon-select'>
              <div className='icon-select_item'>
                <input type='radio' className='icon-select_input'
                    id={fieldIdAttr('text')} name={fieldNameAttr}
                    value='INTRODUCTION' checked={step.type==='INTRODUCTION'} onChange={changeType} />
                <label htmlFor={fieldIdAttr('text')} className='icon-select_label'>
                  <Icon.TypeText />
                  <span className='icon-select_label-text'>Introduksjon</span>
                </label>
              </div>
              <div className='icon-select_item'>
                <input type='radio' className='icon-select_input'
                    id={fieldIdAttr('text')} name={fieldNameAttr}
                    value='TEXT' checked={step.type==='TEXT'} onChange={changeType} />
                <label htmlFor={fieldIdAttr('text')} className='icon-select_label'>
                  <Icon.TypeText />
                  <span className='icon-select_label-text'>Tekst</span>
                </label>
              </div>
              <div className='icon-select_item'>
                <input type='radio' className='icon-select_input'
                    id={fieldIdAttr('video')} name={fieldNameAttr}
                    value='MULTIMEDIA' checked={step.type==='MULTIMEDIA'} onChange={changeType} />
                <label htmlFor={fieldIdAttr('video')} className='icon-select_label'>
                  <Icon.TypeMedia />
                  <span className='icon-select_label-text'>Multimedia</span>
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
            {embedSourceInput}
          </div>
          <div>
            <input className='button' type='submit' value='Lagre' disabled={ !this.isValid() } />
            <input className='button' type='button' value='Slett' disabled={true} />
          </div>
        </div>
      </form>
    );
  }
}

PathStep.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  step: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired
};
