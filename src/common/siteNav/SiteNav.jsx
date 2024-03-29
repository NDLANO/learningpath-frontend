/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import polyglot from "../../i18n";
import LabeledIcon from "../LabeledIcon";
import SiteNavAdmin from "./SiteNavAdmin";
import SiteNavMyPage from "./SiteNavMyPage";
import SiteNavSessionAction from "./SiteNavSessionAction";
import OnlyRenderOnClient from "../OnlyRenderOnClient";
import { closeSidebars } from "../sidebarActions";
import { getPersonalToken } from "../../sources/localStorage";
import { decodeToken, getScope } from "../../util/jwtHelper";
import SelectLocale from "../../locale/SelectLocale";

export const SiteNav = ({ authenticated, userName, cssModifier, localCloseSidebars, isAdmin, showSelectLocale }) => {
  const rootClasses = classNames({
    "site-nav": true,
    [`site-nav--${cssModifier}`]: cssModifier,
  });

  return (
    <div className={rootClasses}>
      <ul className="site-nav_list">
        {showSelectLocale && <SelectLocale id="language-select" className="footer_language-select" />}
        <li className="site-nav_item">
          <Link
            to={{
              pathname: "/minside",
              search: "?openModal=true",
            }}
            className="site-nav_link"
            onClick={() => localCloseSidebars()}
            data-cy="sitenav-create-path"
          >
            <LabeledIcon.Add labelText={polyglot.t("siteNav.createLearningPath")} />
          </Link>
        </li>
        <li className="site-nav_item">
          <Link
            to="/learningpaths"
            className="site-nav_link"
            onClick={() => localCloseSidebars()}
            data-cy="sitenav-find-paths"
          >
            <LabeledIcon.Search labelText={polyglot.t("siteNav.search")} />
          </Link>
        </li>
        <OnlyRenderOnClient>
          <SiteNavAdmin isAdmin={isAdmin} authenticated={authenticated} localCloseSidebars={localCloseSidebars} />
          <SiteNavMyPage authenticated={authenticated} localCloseSidebars={localCloseSidebars} />
          <SiteNavSessionAction
            authenticated={authenticated}
            userName={userName}
            localCloseSidebars={localCloseSidebars}
          />
        </OnlyRenderOnClient>
      </ul>
    </div>
  );
};

SiteNav.propTypes = {
  authenticated: PropTypes.bool,
  userName: PropTypes.string,
  localCloseSidebars: PropTypes.func.isRequired,
  cssModifier: PropTypes.string,
  isAdmin: PropTypes.bool.isRequired,
  showSelectLocale: PropTypes.bool,
};

SiteNav.defaultProps = {
  authenticated: false,
  userName: "",
};

const mapStateToProps = (state) => {
  const token = getPersonalToken();
  return Object.assign({}, state, {
    username: state.authenticated ? decodeToken(token)["https://ndla.no/user_name"] : "",
    isAdmin: state.authenticated ? getScope(token).includes(`learningpath:admin`) : false,
  });
};

const mapDispatchToProps = {
  localCloseSidebars: closeSidebars,
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteNav);
