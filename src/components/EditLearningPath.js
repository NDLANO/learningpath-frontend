import React from 'react';
import { connect } from 'react-redux';

export function EditLearningPath (props) {
  return (<div className='two-column'>
      <aside className='two-column_col'>
        <EditLearningPath.Navigation {...props} />
      </aside>
      <main className='two-column_col'>
        <div className='learning-path_hd'>
          <h1 className='learning-path_title'>Learning step one</h1>
        </div>
        <div className='learning-path_bd'>
          <p>whatever</p>
        </div>
        <div className='wrapper wrapper_gray'>
          <form>
            <h4>Legg til innhold</h4>
            <p>Lim in lenke (URL) fra ndla.no eller youtube</p>
            <input type='url' />
          </form>
        </div>
        <div className='wrapper wrapper_gray'>
          <form>
            <h4>Innholdstype</h4>
            <select>
              <option>Tekst</option>
              <option>Test</option>
              <option>Oppgave</option>
              <option>Multimedia</option>
              <option>Prøve</option>
            </select>
          </form>
        </div>
        <div className='wrapper wrapper_gray'>
          <form>
            <h4>Opphavs- og bruksrett</h4>
            <select>
              <option>Navngivelse</option>
              <option>Navngivelse - del på samme vilkår</option>
              <option>Navngivelse - ikke kommersiell</option>
              <option>Bryr meg ikke</option>
            </select>
          </form>
        </div>
      </main>
  </div>);
}

EditLearningPath.Navigation = function ({learningPath, lang}) {
  console.log(learningPath);
  console.log(lang);
  return (
    <div className='step-nav'>
      <div className='step-nav_learningpath-general-info'>
        <h2 className='step-nav_h'>Learning Path</h2>
      </div>
      <ul className='step-nav_list'>
        <li className='step-nav_item'><a className='step-nav_link' href='#'>Introdukjson</a></li>
        <li className='step-nav_item'><a className='step-nav_link' href='#'>Learning step one</a></li>
        <li className='step-nav_item step-nav_item--active'><a className='step-nav_link' href='#'>Learning step two</a></li>
        <li className='step-nav_item'><a className='step-nav_link' href='#'>Learning step three</a></li>
      </ul>
      <ul className='vertical-menu'>
        <li className='vertical-menu_item'><a className='cta-link cta-link--block' href='#'>Legg til læringssteg</a></li>
        <li className='vertical-menu_item'><a className='cta-link cta-link--block' href='#'>Lagre</a></li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => Object.assign({}, state, {
  learningPath: state.privateLearningPath,
  activePathname: ownProps.location.pathname
});

export default connect(mapStateToProps)(EditLearningPath);
