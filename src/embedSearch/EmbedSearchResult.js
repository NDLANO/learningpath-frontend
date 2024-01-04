/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import EmbedSearchResultImage from "./EmbedSearchResultImage";
import Icon from "../common/Icon";
import polyglot from "../i18n";

const EmbedSearchResult = ({ item, onPreviewClick, addEmbedResult }) => {
  const rootClass = classNames({
    "embed-search_result": true,
    "embed-search_result--disabled": item.disable,
  });
  return (
    <div className={rootClass}>
      <EmbedSearchResultImage thumbnail={item.thumbnail} thumbnailAlt={item.thumbnailAlt} title={item.title} />
      <div className="embed-search_result-information">
        <h3 className="embed-search_result-title">{item.title}</h3>
        {item.showUrl && (
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            {item.link}
          </a>
        )}
        <p>{item.introduction}</p>
        {item.disable && (
          <span className="error_message error_message--red">{polyglot.t("embedSearch.results.error")}</span>
        )}
        <div>
          <button
            type="button"
            onClick={(evt) => addEmbedResult(evt, item.link)}
            className="un-button google-custom-search_add-button"
            disabled={item.disable}
          >
            <Icon.Add />
            {polyglot.t("embedSearch.results.useInPath")}
          </button>
          <button
            type="button"
            onClick={(evt) => onPreviewClick(evt, item)}
            className="un-button embed-search_preview-button"
            disabled={item.disable}
          >
            <Icon.RemoveRedEye />
            {polyglot.t("embedSearch.results.preview")}
          </button>
        </div>
      </div>
    </div>
  );
};

EmbedSearchResult.propTypes = {
  item: PropTypes.object.isRequired,
  onPreviewClick: PropTypes.func.isRequired,
  addEmbedResult: PropTypes.func.isRequired,
};

export default EmbedSearchResult;
