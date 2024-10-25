/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import PropTypes from "prop-types";
import SafeLink from "@ndla/safelink";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import polyglot from "../i18n";
import withCloseSidebars from "./withCloseSidebars";

const onDark = css`
  & a {
    background-image: url("/ndla-logo-white.png");
  }
  &:any-link {
    color: white;
  }
`;

const StyledDiv = styled.div`
  display: inline-block;
  margin: 0;
  padding: 0;
  height: 50px;
  width: 150px;
  ${(props) => {
    if (props.onDark) {
      return onDark;
    }
    return "";
  }};
`;

const StyledSafeLink = styled(SafeLink)`
  display: inline-block;
  height: 100%;
  width: 100%;
  padding-left: 100%;
  overflow: hidden;
  background: url("/logo.png") no-repeat;
  background-size: contain;
  vertical-align: top;

  &:any-link {
    text-decoration: none;
  }
`;

function Logo(props) {
  const { closeSidebars, onDark } = props;

  return (
    <StyledDiv className="un-button" onDark={onDark}>
      <StyledSafeLink to="/" onClick={closeSidebars}>
        {polyglot.t("logo.altText")}
      </StyledSafeLink>
    </StyledDiv>
  );
}

Logo.propTypes = {
  cssModifier: PropTypes.string,
  closeSidebars: PropTypes.func.isRequired,
  onDark: PropTypes.bool,
};

export default withCloseSidebars(Logo);
