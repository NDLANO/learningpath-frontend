import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import get from 'lodash/get';
import LabeledIcon from './LabeledIcon';
import TitleEditor from './editors/TitleEditor';
import DescriptionEditor from './editors/DescriptionEditor';
import { titleI18N, descriptionI18N } from '../util/i18nFieldFinder';
import polyglot from '../i18n';

import Icon from './Icon';

import {
  updateLearningPathTitle,
  updateLearningPathDescription,
  updateLearningPath,
  updateLearningPathDescriptionLength
} from '../actions';

export function EditLearningPath (props, {lang}) {
  let {
    learningPath,
    updateTitle,
    updateDescription,
    saveAction
  } = props;

  let titleText = titleI18N(learningPath, lang) || '';
  let descriptionText = descriptionI18N(learningPath, lang) || '';

  let saveLearningPath = () => saveAction(learningPath);

  const descriptionTextRemain = descriptionText ? 150 - descriptionText.length : 150;
  return <div>
    <div className='learning-path_hd'>
      <label className='label--bold label--medium'>Tittel på læringssti</label>
      <h1 className='learning-path-input learning-path-input__title'>
        <TitleEditor value={titleText} onChange={updateTitle} lang={lang} />
      </h1>
    </div>
    <div className='learning-path_bd'>
      <label className='label--bold label--medium'>Beskrivelse</label>
      <div className='learning-path-input learning-path-input__paragraph'>
        <DescriptionEditor value={descriptionText} onChange={updateDescription} lang={lang} />
      </div>
      <p className='learning-path-input__paragraph_info'>Maks 150 tegn og du har {descriptionTextRemain} igen. Beskrivelsen blir synlig i søk </p>
      <div className='block-container_fixed block-container_fixed--bottom--right'>
        <div className="button-group">
          <Link to={`/learningpaths/${learningPath.id}`} className="button button--secondary">
            <LabeledIcon.Clear labelText={polyglot.t('editPage.cancelBtn')} />
          </Link>
          <button className='button button--primary' onClick={saveLearningPath}>
            <LabeledIcon.Save labelText={polyglot.t('editPage.savePathBtn')} />
          </button>
        </div>
      </div>
      <div className='learning-path-image'>
        <label className='label--bold label--medium'>Illustrerende bilde</label>
        <div className='learning-path-image-drop'>
          <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/49665-200.png'/>
          <h2>Klikk for å velge</h2>
        </div>
      </div>
      <div className='learning-path-duration'>
        <label className='label--bold label--medium'>Varighet</label>
      </div>

    </div>
  </div>;
}

EditLearningPath.propTypes = {
  learningPath: PropTypes.object.isRequired,
  learningSteps: PropTypes.array.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateDescription: PropTypes.func.isRequired,
  saveAction: PropTypes.func.isRequired
};

EditLearningPath.contextTypes = {
  lang: PropTypes.string.isRequired
};

const mapStateToProps = state => Object.assign({}, state, {
  learningPath: get(state, 'learningPath', {}),
  learningSteps: get(state, 'learningPath.learningsteps', []),
});

const mapDispatchToProps = {
  updateTitle: updateLearningPathTitle,
  updateDescription: updateLearningPathDescription,
  saveAction: lp => updateLearningPath(lp.id, lp),
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLearningPath);
