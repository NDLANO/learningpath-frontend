/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import isEmpty from 'lodash/isEmpty';

import Logo from '../common/Logo';
import polyglot from '../i18n';
import Masthead from '../common/Masthead';
import { Wrapper, OneColumn, Footer } from '../common/Layout';


class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { query } = this.state;
    e.preventDefault();
    const sort = (query && !isEmpty(query)) ? '-relevance' : '-lastUpdated';
    this.props.pushRoute({ pathname: '/learningPaths', query: { query, page: 1, sort } });
  }

  render() {
    const assets = config.isProduction = require('../../server/developmentAssets'); // eslint-disable-line
    return (
      <Wrapper>
        <OneColumn>
          <div className="frontpage-masthead">
            <Masthead logo={<Logo cssModifier="on-dark" />} />
          </div>
          <div className="hero">
            <h1 className="hero_title">{polyglot.t('welcomePage.title1')}</h1>
            <h3 className="hero_title">{polyglot.t('welcomePage.title2')}</h3>

            <form onSubmit={this.handleSubmit} className="search-form search-form--on-dark">
              <input
                type="text" name="query"
                onChange={e => this.setState({ query: e.target.value })}
                placeholder={polyglot.t('welcomePage.placeholder')}
                className="search-form_query"
              />
              <button type="submit" className="search-form_btn">{polyglot.t('welcomePage.searchBtn')}</button>
            </form>

            <a href="#feature" className="hero_link cta-link cta-link--negative">{polyglot.t('welcomePage.explanationBtn')}</a>
            <a href="/minside" className="hero_link cta-link cta-link-secondary cta-link--secondary-negative">{polyglot.t('welcomePage.newBtn')} »</a>
          </div>
          <div className="infoblock">
            <img src={`/assets/${window.assets['learningpath.jpg']}`} alt="Placeholder" className="infoblock_img frontpage-intro_img" />
            <div className="infoblock_text">
              <h2 id="feature">{polyglot.t('welcomePage.feature1Title')}</h2>
              <p>{polyglot.t('welcomePage.feature1Content')}</p>
            </div>
          </div>
        </OneColumn>
        <Footer />
      </Wrapper>
    );
  }
}

Welcome.propTypes = {
  pushRoute: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  pushRoute: routerActions.push,
};

export default connect(state => state, mapDispatchToProps)(Welcome);
