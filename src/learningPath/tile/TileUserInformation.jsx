/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import PropTypes from "prop-types";
import BEMHelper from "react-bem-helper";
import polyglot from "../../i18n";
import Icon from "../../common/Icon";

const classes = new BEMHelper({
  name: "tile",
  prefix: "c-",
});

const TileUserInformation = ({ owner }) =>
  owner ? (
    <React.Fragment>
      <div {...classes("property")}>
        <div {...classes("propterty-icon")}>
          <Icon.Person />
        </div>
        <p {...classes("property-description")}>{polyglot.t("tilePage.path.owner.name")}</p>
        <p>{owner.name}</p>
      </div>
      <div {...classes("property")}>
        <div {...classes("propterty-icon")}>
          <Icon.Person />
        </div>
        <p {...classes("property-description")}>{polyglot.t("tilePage.path.owner.email")}</p>
        <p>{owner.email}</p>
      </div>
    </React.Fragment>
  ) : null;

TileUserInformation.propTypes = {
  owner: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default TileUserInformation;
