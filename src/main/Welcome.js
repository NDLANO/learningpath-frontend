/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { routerActions } from "react-router-redux";
import isEmpty from "lodash/isEmpty";
import { HelmetWithTracker } from "@ndla/tracker";
import queryString from "query-string";
import Logo from "../common/Logo";
import polyglot from "../i18n";
import Masthead from "../common/Masthead";
import { Wrapper, OneColumn, Footer } from "../common/Layout";
import { Matomo } from "../common/Matomo";
import { getLocale } from "../locale/localeSelectors";
import config from "../config";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { query } = this.state;
    e.preventDefault();
    const sort = query && !isEmpty(query) ? "-relevance" : "-lastUpdated";
    this.props.pushRoute({
      pathname: "/learningpaths",
      search: `?${queryString.stringify({ query, page: 1, sort })}`,
    });
  }

  render() {
    const { locale } = this.props;
    const myNdlaUrl = `${config.ndlaFrontendDomain}/minndla`;
    return (
      <Wrapper>
        <HelmetWithTracker title={polyglot.t("htmlTitles.welcomePage")} />
        <OneColumn>
          <div className="alert-banner">
            {polyglot.t("welcomePage.alert.content1")}
            <a href={myNdlaUrl} target="_blank" rel="noreferrer">
              {polyglot.t("welcomePage.alert.myNdla")}
            </a>
            {polyglot.t("welcomePage.alert.content2")}
            <a href="https://stier.ndla.no" target="_blank" rel="noreferrer">
              stier.ndla.no
            </a>
            {polyglot.t("welcomePage.alert.content3")}
          </div>
          <div className="frontpage-masthead">
            <Masthead logo={<Logo onDark={true} />} />
          </div>
          <div className="hero">
            <h1 className="hero_title" data-cy="welcomepage-title1">
              {polyglot.t("welcomePage.title1")}
            </h1>
            <h3 className="hero_title" data-cy="welcomepage-title2">
              {polyglot.t("welcomePage.title2")}
            </h3>
            <form onSubmit={this.handleSubmit} className="search-form search-form--on-dark">
              <input
                type="text"
                name="query"
                onChange={(e) => this.setState({ query: e.target.value })}
                placeholder={polyglot.t("welcomePage.placeholder")}
                className="search-form_query"
                data-cy="query"
              />
              <button type="submit" className="search-form_btn" data-cy="submit">
                {polyglot.t("welcomePage.searchBtn")}
              </button>
            </form>
          </div>
        </OneColumn>
        <Footer locale={locale} />
        <Matomo />
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

const mapStateToProps = (state) => ({
  locale: getLocale(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
