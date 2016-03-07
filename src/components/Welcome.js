import React from 'react';
import { Link } from 'react-router';
import Form from 'react-router-form';

function Logo () {
  return (
    <h1 className='logo logo--on-dark'>
      <Link to='/' className='logo_link'>Nasjonal digital læringsarena</Link>
    </h1>
  );
}

function SiteNav () {
  return (<div className='site-nav site-nav--on-dark'>
      <ul className='site-nav_list'>
        <li className='site-nav_item'>
          <Link to='/learningpaths' className='site-nav_link'>Finn læringssti</Link>
        </li>
        <li className='site-nav_item'>
          <Link to='/login' className='site-nav_link'>Logg inn</Link>
        </li>
      </ul>
    </div>
  );
}

export default function Welcome () {
  return (
    <div>
      <div className='hero'>
        <div className='frontpage-masthead'>
          <div className='frontpage-masthead_left'>
            <Logo />
          </div>
          <div className='frontpage-masthead_right'>
            <SiteNav />
          </div>
        </div>

        <h1 className='hero_title'>Læringssier</h1>
        <h3 className='hero_title'>Nasjonal digital læringsarena</h3>

        <Form to='/learningpaths' method='GET' className='search-form search-form--on-dark'>
          <input type='text' name='query' placeholder='Søk etter læringsstier' className='search-form_query' />
          <input type='submit' className='search-form_btn button' value='Søk' />
        </Form>

        <a href='#' className='hero_link cta-link cta-link--negative'>Hva er en læringssti?</a>
        <a href='#' className='hero_link cta-link cta-link-secondary cta-link--secondary-negative'>Lag din egen læringssti »</a>
      </div>
      <div className='infoblock'>
        <div className='infoblock'>
          void
        </div>
      </div>
    </div>
  );
}
