import React, {PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';

const fields = ['title', 'description'];

export class CreateLearningPath extends React.Component {
  render() {
    const {
      fields: { title, description },
      handleSubmit
    } = this.props;
    return (<form onSubmit={handleSubmit}>
        <h1>Opprett ny læringssti</h1>
          <div>
            <label>Tittel</label>
            <input type="text" required {...title} />
          </div>

          <div>
            <label>Beskrivelse</label>
            <textarea rows="4" cols="50" placeholder="Skriv en kort beskrivelse av læringsstien." maxLength="155"
              className="textarea"
    />
          </div>
        <p className="hint-text">Max 155 tegn</p>
        <button className="button cta-link cta-link--block" type="submit">Opprett ny læringssti</button>
      </form>
    );
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch(reset('create-learning-path'));
  }
}

CreateLearningPath.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'create-learning-path',
  fields
})(CreateLearningPath);
