import React from 'react';
import { Link } from 'react-router';
import Form from 'react-router-form';

export default function Welcome () {
  return (
    <div>
      <div className='hero'>
        <div className='nav'>
          <div className='home--logo'>
            <img src='/assets/ndla-logo-white.png' alt='Nasjonal digital læringsarena' />
          </div>
          <div className='home--login'>
            <Link to='/login'>Ny bruker</Link>
            <Link to='/login'>Logg inn</Link>
          </div>
          <h1 className='hero--title'>Læringssier</h1>
          <h3 className='hero--title'>Nasjonal digital læringsarena</h3>
          <Form to='/learningpaths' method='GET' className='search-form'>
            <input type='text' name='query' placeholder='Søk etter læringsstier' className='search-form_query' />
            <input type='submit' className='search-form_btn button' value='Søk' />
          </Form>
          <a href='#' className='cta-link cta-link--negative'>Hva er en læringssti?</a>
          <a href='#' className='cta-link cta-link-secondary cta-link--secondary-negative cta-spacer'>Lag din egen læringssti »</a>
        </div>
      </div>
      <div className='infoblock'>
        <div className='infoblock'>
          void
        </div>
      </div>
    </div>
  );
}
