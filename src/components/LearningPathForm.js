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
import { reduxForm, reset } from 'redux-form';

const fields = ['title', 'description'];

const validate = values => {
  const errors = {}
  console.log(values)
  if (!values.description.length > 150) {
    errors.description = 'Teksten er for lang'
  }
  return errors;
};

export class LearningPathForm extends React.Component {
  render() {
    console.log(this.props)

    const {
      fields: { title, description },
      handleSubmit,
      learningPath,
      lang
    } = this.props;



    let titleText = titleI18N(learningPath, lang) || '';
    let descriptionText = descriptionI18N(learningPath, lang) || '';

    return (
      <form onSubmit={handleSubmit}>
        <div className='learning-path_hd'>
          <label className='label--bold label--medium'>Tittel på læringssti</label>
          <h1 className='learning-path-input learning-path-input__title'>
            <input type="text" required{...title} lang={lang} />
          </h1>
        </div>
        <div className='learning-path_bd'>
          <label className='label--bold label--medium'>Beskrivelse</label>
          <div className='learning-path-input learning-path-input__paragraph'>
            <textarea rows="4" cols="50" placeholder="Skriv en kort beskrivelse av læringsstien." maxLength="155"
                      className="textarea" {...description} />
          </div>

          {description.touched && description.error && <span className='red'>{description.error}</span>}

          <p className='learning-path-input__paragraph_info'>Maks 150 tegn og du har {150 - description.value.length } igen. Beskrivelsen blir synlig i søk.</p>
          <div className='block-container_fixed block-container_fixed--bottom--right'>
            <div className="button-group">
              <Link to={`/learningpaths/${learningPath.id}`} className="button button--secondary">
                <LabeledIcon.Clear labelText={polyglot.t('editPage.cancelBtn')} />
              </Link>
              <button className='button button--primary' type="submit">
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
      </form>
    );
  }
}





/*export function EditLearningPath (props, {lang}) {
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
}*/

LearningPathForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'edit-learning-path',
  fields,
  validate
})(LearningPathForm);
