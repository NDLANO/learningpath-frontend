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
import queryString from "query-string";
import { HelmetWithTracker } from "@ndla/tracker";
import {
  deleteLearningPath,
  createLearningPath,
  copyLearningPath,
  updateLearningPathsStatus,
} from "../learningPath/learningPathActions";
import LabeledIcon from "../common/LabeledIcon";
import polyglot from "../i18n";
import LearningPathDropdown from "./LearningPathDropdown";
import Lightbox from "../common/Lightbox";
import Masthead from "../common/Masthead";
import CreateLearningPath from "../learningPath/new/CreateLearningPath";
import { Wrapper, OneColumn, Footer } from "../common/Layout";
import { setMyLearningPathsSortOrder, fetchMyLearningPaths } from "./myPageActions";
import { getLearningPaths, getSortKey } from "./myPageSelectors";
import LearningPathTile from "../learningPath/tile/LearningPathTile";
import SelectSortTiles from "../learningPath/tile/SelectSortTiles";
import { LocationShape, HistoryShape } from "../shapes";
import { getLocale } from "../locale/localeSelectors";

export class MyPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCreatePath: false,
    };
    this.onClose = this.onClose.bind(this);
    this.onCreateLearningPath = this.onCreateLearningPath.bind(this);
    this.onDropDownSelect = this.onDropDownSelect.bind(this);
  }

  componentDidMount() {
    const { localFetchMyLearningPaths } = this.props;
    localFetchMyLearningPaths();
  }

  onCreateLearningPath(values) {
    const { createPath, locale: language } = this.props;
    createPath({
      title: values.title,
      description: values.description,
      tags: [],
      language,
      duration: 60,
      coverPhoto: { url: "", metaUrl: "" },
      copyright: {
        license: {
          description: "Creative Commons Attribution-ShareAlike 4.0 International",
          license: "CC-BY-SA-4.0",
          url: "https://creativecommons.org/licenses/by-sa/4.0/",
        },
        contributors: [],
      },
    });
  }

  onDropDownSelect(actionType, learningPath) {
    const { deletePath, updatePathStatus, copyPath, locale: language } = this.props;
    switch (actionType) {
      case "delete":
        deletePath(learningPath);
        break;
      case "unlist":
        updatePathStatus(learningPath.id, "UNLISTED");
        break;
      case "unpublish":
        updatePathStatus(learningPath.id, "PRIVATE");
        break;
      case "submit":
        updatePathStatus(learningPath.id, "SUBMITTED");
        break;
      case "makecopy":
        copyPath(learningPath, language);
        break;
      default:
    }
  }

  onClose() {
    const { history, location } = this.props;
    this.setState({ displayCreatePath: false }, () => {
      history.push(location.pathname);
    });
  }

  render() {
    const { learningPaths, sortKey, locale, setSortKey, location } = this.props;

    const items = learningPaths.map((learningPath) => {
      const dropdown = <LearningPathDropdown onSelect={this.onDropDownSelect} learningPath={learningPath} />;
      return <LearningPathTile key={learningPath.id} dropdown={dropdown} learningPath={learningPath} />;
    });

    const { openModal } = queryString.parse(location.search);

    const displayLightbox = this.state.displayCreatePath || openModal === "true";
    return (
      <Wrapper>
        <OneColumn>
          <Masthead />
          <HelmetWithTracker title={polyglot.t("htmlTitles.myPage")} />
          <div className="page-header page-header--primary">
            <h2 className="page-header_name">{polyglot.t("myPage.pageHeader")}</h2>
            <div className="page-header_ctrls">
              <SelectSortTiles
                className="select--white-border"
                sortKey={sortKey}
                onChange={(evt) => setSortKey(evt.target.value)}
              />
            </div>
          </div>
          <div className="tiles">{items}</div>
          <button
            type="button"
            className="cta-link new-learningpath-button"
            onClick={() => {
              this.setState({ displayCreatePath: true });
            }}
            data-cy="mypage-new-learningpath-button"
          >
            <LabeledIcon.Add labelText={polyglot.t("myPage.newBtn")} />
          </button>
          <Lightbox display={displayLightbox} onClose={this.onClose}>
            <CreateLearningPath onSubmit={this.onCreateLearningPath} />
          </Lightbox>
        </OneColumn>
        <Footer locale={locale} />
      </Wrapper>
    );
  }
}

MyPage.propTypes = {
  sortKey: PropTypes.oneOf(["title", "lastUpdated", "-lastUpdated", "status"]),
  locale: PropTypes.string.isRequired,
  setSortKey: PropTypes.func.isRequired,
  deletePath: PropTypes.func.isRequired,
  updatePathStatus: PropTypes.func.isRequired,
  createPath: PropTypes.func.isRequired,
  learningPaths: PropTypes.array,
  copyPath: PropTypes.func.isRequired,
  localFetchMyLearningPaths: PropTypes.func.isRequired,
  location: LocationShape,
  history: HistoryShape,
};

MyPage.defaultProps = { learningPaths: [], sortKey: "title" };

export function mapStateToProps(state) {
  const sortKey = getSortKey(state);
  const learningPaths = getLearningPaths(state);
  const locale = getLocale(state);

  return Object.assign({}, state, { learningPaths, sortKey, locale });
}

const mapDispatchToProps = {
  setSortKey: setMyLearningPathsSortOrder,
  deletePath: deleteLearningPath,
  updatePathStatus: updateLearningPathsStatus,
  createPath: createLearningPath,
  copyPath: copyLearningPath,
  localFetchMyLearningPaths: fetchMyLearningPaths,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
