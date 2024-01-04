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

const LearningPathDescription = ({ input, meta: { touched, error } }) => {
  const descriptionClassName =
    touched && error ? "textarea textarea--resize-vertical input--alert" : "textarea textarea--resize-vertical";
  return (
    <div>
      <label className="label--medium-bold  label--medium" htmlFor="description">
        {polyglot.t("learningPath.description")}
      </label>
      <textarea
        {...input}
        rows="4"
        cols="50"
        maxLength="150"
        placeholder={polyglot.t("learningPath.descriptionPlaceholder")}
        className={descriptionClassName}
      />
      {touched && error && <span className="error_message error_message--red">{error}</span>}
      <p className="learning-path_input-information">
        {polyglot.t("learningPath.descriptionInformation", {
          remainingDescriptionLength: input.value ? 150 - input.value.length : 150,
        })}
      </p>
    </div>
  );
};
LearningPathDescription.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default LearningPathDescription;
