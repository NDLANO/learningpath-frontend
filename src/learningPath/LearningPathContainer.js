/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import LearningPathSearch from "./search/LearningPathSearch";
import PrivateRoute from "../main/PrivateRoute";
import CreateLearningPath from "./new/CreateLearningPath";
import LearningPath from "./LearningPath";

const LearningPathContainer = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}/`} component={LearningPathSearch} />
    <Route path="/learningpaths/:pathId/first-step" component={LearningPath} />
    <PrivateRoute path={`${match.url}/new`} component={CreateLearningPath} />
    <Route path={`${match.url}/:pathId/step/:stepId`} component={LearningPath} />
    <Route path={`${match.url}/:pathId`} component={LearningPath} />
  </Switch>
);

LearningPathContainer.propTypes = {
  match: PropTypes.object.isRequired,
};

export default LearningPathContainer;
