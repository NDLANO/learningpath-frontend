import React from 'react';
import Form from 'react-router-form';
import Logo from './Logo';
import SiteNav from './SiteNav';

export default class Welcome extends React.Component {
  getChildContext () {
    return {
      lang: 'nb'
    };
  }

  render () {
    return (
      <div>
        <div className='hero'>
          <div className='frontpage-masthead'>
            <div className='frontpage-masthead_left'>
              <Logo cssModifier='on-dark' />
            </div>
            <div className='frontpage-masthead_right'>
              <SiteNav cssModifier='on-dark' />
            </div>
          </div>

          <h1 className='hero_title'>Læringsstier</h1>
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
}

Welcome.childContextTypes = {
  lang: React.PropTypes.string
};
