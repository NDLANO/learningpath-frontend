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
import ArticleSearch from "../../../articleSearch/ArticleSearch";
import ExternalEmbedSearch from "../../../externalEmbedSearch/ExternalEmbedSearch";
import * as actions from "../../../embedSearch/embedSearchActions";
import polyglot from "../../../i18n";

class LearningPathStepEmbed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ndla: false,
      external: false,
    };
    this.handleExternalDisplayOpen = this.handleExternalDisplayOpen.bind(this);

    this.handleExternalDisplayClose = this.handleExternalDisplayClose.bind(this);
    this.toggleNdlaDisplay = this.toggleNdlaDisplay.bind(this);
  }

  handleExternalDisplayOpen(evt) {
    evt.preventDefault();
    this.setState({ external: true });
  }

  handleExternalDisplayClose() {
    this.props.removeOembed({ type: "external" });
    this.setState({ external: false });
  }

  toggleNdlaDisplay(evt) {
    evt.preventDefault();
    this.setState((prevState) => ({
      ndla: !prevState.ndla,
    }));
  }

  render() {
    const { learningPathId, step, handleEmbedUrlChange } = this.props;
    return (
      <div className="learning-step-embed_group">
        <div className="button-group button-group--square button-group--block">
          <button type="button" className="button--primary-outline" onClick={this.toggleNdlaDisplay}>
            {polyglot.t("embedSearch.ndlaButton")}
          </button>
          <button type="button" className="button--primary-outline" onClick={this.handleExternalDisplayOpen}>
            {polyglot.t("embedSearch.externalButton")}
          </button>
        </div>
        <ExternalEmbedSearch
          learningPathId={learningPathId}
          stepId={step.id}
          urlOnBlur={handleEmbedUrlChange}
          handleDisplayClose={this.handleExternalDisplayClose}
          display={this.state.external}
        />
        <ArticleSearch
          urlOnBlur={handleEmbedUrlChange}
          display={this.state.ndla}
          toggleNdlaDisplay={this.toggleNdlaDisplay}
        />
      </div>
    );
  }
}
const mapDispatchToProps = {
  removeOembed: actions.removeEmbedPreview,
};

LearningPathStepEmbed.propTypes = {
  learningPathId: PropTypes.number.isRequired,
  step: PropTypes.object.isRequired,
  handleEmbedUrlChange: PropTypes.func.isRequired,
  removeOembed: PropTypes.func.isRequired,
};

export default connect((state) => state, mapDispatchToProps)(LearningPathStepEmbed);
