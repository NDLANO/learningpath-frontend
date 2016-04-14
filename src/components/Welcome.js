import React from 'react';
import Form from 'react-router-form';
import Logo from './Logo';
import SiteNav from './SiteNav';
import polyglot from '../i18n';

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

          <h1 className='hero_title'>{polyglot.t('welcomePage.title1')}</h1>
          <h3 className='hero_title'>{polyglot.t('welcomePage.title2')}</h3>

          <Form to='/learningpaths' method='GET' className='search-form search-form--on-dark'>
            <input type='text' name='query' placeholder={polyglot.t('welcomePage.placeholder')} className='search-form_query' />
            <input type='submit' className='search-form_btn button' value='Søk' />
          </Form>

          <a href='#' className='hero_link cta-link cta-link--negative'>{polyglot.t('welcomePage.explanationBtn')}</a>
          <a href='#' className='hero_link cta-link cta-link-secondary cta-link--secondary-negative'>{polyglot.t('welcomePage.newBtn')} »</a>
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
