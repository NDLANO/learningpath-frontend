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
import Lightbox from "../common/Lightbox";
import polyglot from "../i18n";

const classes = new BEMHelper({
  name: "admin",
  prefix: "c-",
});

const AdminRejectedMessageForm = ({ show, onClose, onChange, onSubmit, message }) => (
  <Lightbox display={show} onClose={onClose}>
    <h3>{polyglot.t("adminPage.rejectedPathMessage.message")}</h3>
    <form onSubmit={onSubmit} {...classes("message-form")}>
      <textarea
        placeholder={polyglot.t("adminPage.rejectedPathMessage.placeholder")}
        value={message}
        rows="10"
        onChange={onChange}
      />
      <input
        value={polyglot.t("adminPage.rejectedPathMessage.button")}
        className="button button--primary button--block"
        type="submit"
      />
    </form>
  </Lightbox>
);

AdminRejectedMessageForm.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default AdminRejectedMessageForm;
