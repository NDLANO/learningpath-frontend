import React, {PropTypes } from 'react';
import { reduxForm, Field, reset } from 'redux-form';

export class CreateLearningPath extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (<form onSubmit={handleSubmit}>
        <h1>Opprett ny læringssti</h1>
        <Field
          name="title"
          component={title =>
            <div>
              <label>Tittel</label>
              <input type="text" required {...title} />
            </div>
          }
        />
        <Field
          name="description"
          component={description =>
            <div>
              <label>Beskrivelse</label>
              <textarea rows="4" cols="50" placeholder="Skriv en kort beskrivelse av læringsstien." maxLength="155"
                        className="textarea" {...description} />
            </div>
          }
        />
        <p className="hint-text">Max 155 tegn</p>
        <button className='button cta-link cta-link--block' type="submit">Oprett ny læringssti</button>
      </form>
    );
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch(reset('create-learning-path'));
  }
}

CreateLearningPath.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'create-learning-path'
})(CreateLearningPath);
