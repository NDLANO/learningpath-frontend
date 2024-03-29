/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import PropTypes from "prop-types";
import polyglot from "../../i18n";

export default function CopyLearningPath({ onClose, onCopy }) {
  return (
    <div className="copy_learning-path">
      <h2>{polyglot.t("copyLearningPath.copyTitle")}</h2>
      <p>{polyglot.t("copyLearningPath.copyText")}</p>
      <button type="button" className="button button-copy_abort" onClick={onClose}>
        {polyglot.t("copyLearningPath.abortCopy")}
      </button>
      <button type="button" className="button button-copy_save" onClick={onCopy}>
        {polyglot.t("copyLearningPath.createCopy")}
      </button>
    </div>
  );
}

CopyLearningPath.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
};
