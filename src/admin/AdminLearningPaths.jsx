/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import PropTypes from "prop-types";
import AdminDropdown from "./AdminDropdown";
import LearningPathTile from "../learningPath/tile/LearningPathTile";

const AdminLearningPaths = ({ learningPaths, onDropDownSelect, noPathsText }) => {
  if (learningPaths.length === 0) {
    return <p>{noPathsText}</p>;
  }
  return learningPaths.map((learningPath) => {
    const dropdown = <AdminDropdown onSelect={onDropDownSelect} learningPath={learningPath} />;
    return <LearningPathTile key={learningPath.id} dropdown={dropdown} learningPath={learningPath} />;
  });
};
AdminLearningPaths.propTypes = {
  learningPaths: PropTypes.array.isRequired,
  onDropDownSelect: PropTypes.func.isRequired,
  noPathsText: PropTypes.string.isRequired,
};

export default AdminLearningPaths;
