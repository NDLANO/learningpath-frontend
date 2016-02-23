import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { titleI18N, descriptionI18N, embedUrlI18N } from '../util/i18nFieldFinder';
import Icon from './Icon';

export function EditLearningPath (props) {
  let pathSteps = get(props, 'learningPath.learningsteps', []).map(step => (
    <EditLearningPath.PathStep key={step.seqNo} {...props} step={step} />
  ));

  return (<div className='two-column'>
      <aside className='two-column_col'>
        <EditLearningPath.Navigation {...props} />
      </aside>
      <main className='two-column_col'>
        <EditLearningPath.PathIntroduction {...props} />
        {pathSteps}
        <a className='cta cta-link cta-link--block' href='#'>
          <Icon.Add />
          <span className="icon--space">Legg til nytt læringssteg</span>
        </a>
      </main>
  </div>);
}

EditLearningPath.Navigation = function ({learningPath, lang}) {
  let stepNavItems = get(learningPath, 'learningsteps', []).map(step => (
    <li className='step-nav_item' key={step.seqNo}>
      <a className='step-nav_link' href={'#step' + step.seqNo}>{titleI18N(step, lang)}</a>
    </li>
  ));

  return (
    <div className='step-nav'>
      <div className='step-nav_learningpath-general-info'>
        <h2 className='step-nav_h'>{titleI18N(learningPath, lang)}</h2>
      </div>
      <ul className='step-nav_list'>
        <li className='step-nav_item'><a className='step-nav_link' href='#intro'>Introdukjson</a></li>
        {stepNavItems}
      </ul>
      <div className='vertical-menu'>
        <a className='cta cta-link cta-link--block' href='#'>
          <Icon.Save />
          <span className="icon--space">Lagre og lukk</span>
        </a>
      </div>
    </div>
  );
};

EditLearningPath.PathIntroduction = function (props) {
  let learningPath = get(props, 'learningPath', {});
  let htmlDescription = descriptionI18N(learningPath, props.lang);

  return (
    <div className='learning-path_introduction'>
      <div className='learning-path_hd'>
        <h1 className='learning-path_title'>Introduksjon</h1>
      </div>
      <div className='learning-path_bd'>
        <div dangerouslySetInnerHTML={{__html: htmlDescription}}></div>
      </div>
    </div>
  );
};

EditLearningPath.PathStep = function ({step, lang}) {
  let title = titleI18N(step, lang);
  let htmlDescription = descriptionI18N(step, lang);
  let embedUrl = embedUrlI18N(step, lang);

  let embedUrlPreview = '';
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

  const fieldNameAttr = `step_${step.seqNo}_type`;
  const fieldIdAttr = value => `${fieldNameAttr}_type_${value}`;
  const changeType = evt => console.log({type: evt.target.value});
  const changeEmbedUrl = evt => console.log({url: evt.target.value, lang});

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
};

const mapStateToProps = state => Object.assign({}, state, {
  learningPath: state.privateLearningPath
});

export default connect(mapStateToProps)(EditLearningPath);
