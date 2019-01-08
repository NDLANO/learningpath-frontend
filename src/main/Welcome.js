/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { HelmetWithTracker } from '@ndla/tracker';
import queryString from 'query-string';
import Logo from '../common/Logo';
import polyglot from '../i18n';
import Masthead from '../common/Masthead';
import { Wrapper, OneColumn, Footer } from '../common/Layout';
import { getLocale } from '../locale/localeSelectors';

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
    const sort = query && !isEmpty(query) ? '-relevance' : '-lastUpdated';
    this.props.pushRoute({
      pathname: '/learningpaths',
      search: `?${queryString.stringify({ query, page: 1, sort })}`,
    });
  }

  render() {
    const { locale } = this.props;
    return (
      <Wrapper>
        <HelmetWithTracker title={polyglot.t('htmlTitles.welcomePage')} />
        <OneColumn>
          <div className="frontpage-masthead">
            <Masthead logo={<Logo cssModifier="on-dark" />} />
          </div>
          <div className="hero">
            <h1 className="hero_title" data-cy="welcomepage-title1">
              {polyglot.t('welcomePage.title1')}
            </h1>
            <h3 className="hero_title" data-cy="welcomepage-title2">
              {polyglot.t('welcomePage.title2')}
            </h3>

            <form
              onSubmit={this.handleSubmit}
              className="search-form search-form--on-dark">
              <input
                type="text"
                name="query"
                onChange={e => this.setState({ query: e.target.value })}
                placeholder={polyglot.t('welcomePage.placeholder')}
                className="search-form_query"
                data-cy="query"
              />
              <button
                type="submit"
                className="search-form_btn"
                data-cy="submit">
                {polyglot.t('welcomePage.searchBtn')}
              </button>
            </form>

            <a
              href="#feature"
              className="hero_link cta-link cta-link--negative"
              data-cy="feature-link">
              {polyglot.t('welcomePage.explanationBtn')}
            </a>
            <Link
              to="/minside"
              className="hero_link cta-link cta-link-secondary cta-link--secondary-negative"
              data-cy="mypage-link">
              {polyglot.t('welcomePage.newBtn')} »
            </Link>
          </div>
          <div className="infoblock">
            <img
              src="/learningpath.jpg"
              alt="Placeholder"
              className="infoblock_img frontpage-intro_img"
            />
            <div className="infoblock_text">
              <h2 id="feature">{polyglot.t('welcomePage.feature1Title')}</h2>
              <p>{polyglot.t('welcomePage.feature1Content')}</p>
            </div>
          </div>
        </OneColumn>
        <Footer locale={locale} />
      </Wrapper>
    );
  }
}

Welcome.propTypes = {
  pushRoute: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  pushRoute: routerActions.push,
};

const mapStateToProps = state => ({
  locale: getLocale(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Welcome);
