import React from 'react';
import Form from 'react-router-form';
import Logo from '../common/Logo';
import polyglot from '../i18n';
import Masthead from '../common/Masthead';
import { Wrapper, Content, Footer } from '../common/Layout';

const Welcome = () =>
  <Wrapper>
    <Content>
      <div className="frontpage-masthead">
        <Masthead logo={<Logo cssModifier="on-dark" />} />
      </div>
      <div className="hero">
        <h1 className="hero_title">{polyglot.t('welcomePage.title1')}</h1>
        <h3 className="hero_title">{polyglot.t('welcomePage.title2')}</h3>

        <Form to="/learningpaths" method="GET" className="search-form search-form--on-dark">
          <input type="text" name="query" placeholder={polyglot.t('welcomePage.placeholder')} className="search-form_query" />
          <button type="submit" className="search-form_btn">{polyglot.t('welcomePage.searchBtn')}</button>
        </Form>

        <a href="#feature" className="hero_link cta-link cta-link--negative">{polyglot.t('welcomePage.explanationBtn')}</a>
        <a href="/minside" className="hero_link cta-link cta-link-secondary cta-link--secondary-negative">{polyglot.t('welcomePage.newBtn')} »</a>
      </div>
      <div className="infoblock">
        <div className="infoblock">
          <div className="infoblock_text">
            <h2 id="feature">{polyglot.t('welcomePage.feature1Title')}</h2>
            <p>{polyglot.t('welcomePage.feature1Content')}</p>
          </div>
          <img src="http://placehold.it/300x200" alt="Placeholder" className="infoblock_img" />
        </div>
      </div>
      <div className="infoblock">
        <div className="infoblock">
          <div className="infoblock_text infoblock_text--left" >
            <h2>{polyglot.t('welcomePage.feature2Title')}</h2>
            <p>{polyglot.t('welcomePage.feature2Content')}</p>
          </div>
          <img src="http://placehold.it/300x200" alt="Placeholder" className="infoblock_img infoblock_img--left" />
        </div>
      </div>
    </Content>
    <Footer />
  </Wrapper>
  ;

export default Welcome;
