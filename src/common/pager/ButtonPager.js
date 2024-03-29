/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";

import { stepNumbers } from "./PagerUtil";

export default function ButtonPager(props) {
  const { page, lastPage, query, pagerAction } = props;
  const steps = stepNumbers(page, lastPage);

  const queryToPage = (pageNumber) => Object.assign({}, query, { page: pageNumber });

  const handleClickToPage = (pageNumber) => (evt) => {
    evt.preventDefault();
    pagerAction(queryToPage(pageNumber));
  };

  const pageLinks = steps.map((n) => {
    if (n === page) {
      return (
        <span key={n} className="search-stepper_step search-stepper_step--active">
          {n}
        </span>
      );
    }
    return (
      <button key={n} type="button" className="search-stepper_step" onClick={handleClickToPage(n)}>
        {n}
      </button>
    );
  });
  let prevPageLink = "";
  let nextPageLink = "";

  if (steps[0] < page) {
    prevPageLink = (
      <button
        type="button"
        className="search-stepper_step search-stepper_step--back"
        onClick={handleClickToPage(page - 1)}
      >
        <Icon.Back />
      </button>
    );
  }

  if (page < lastPage) {
    nextPageLink = (
      <button
        type="button"
        className="search-stepper_step search-stepper_step--forward"
        onClick={handleClickToPage(page + 1)}
      >
        <Icon.Forward />
      </button>
    );
  }

  return (
    <div className="search-stepper">
      {prevPageLink}
      {pageLinks}
      {nextPageLink}
    </div>
  );
}

ButtonPager.propTypes = {
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  query: PropTypes.object.isRequired,
  pagerAction: PropTypes.func.isRequired,
};
