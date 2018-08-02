/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import queryString from 'query-string';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Icon from '../Icon';
import { stepNumbers } from './PagerUtil';

export default function LinkPager(props) {
  const { page, lastPage, query } = props;
  const steps = stepNumbers(page, lastPage);

  const queryToPage = pageNumber =>
    Object.assign({}, query, { page: pageNumber });
  const linkToPage = pageNumber => ({
    pathname: '/learningpaths',
    search: `?${queryString.stringify(queryToPage(pageNumber))}`,
  });

  const pageLinks = steps.map(n => {
    if (n === page) {
      return (
        <span
          key={n}
          className="search-stepper_step search-stepper_step--active">
          {n}
        </span>
      );
    }
    return (
      <Link key={n} className="search-stepper_step" to={linkToPage(n)}>
        {n}
      </Link>
    );
  });
  let prevPageLink = '';
  let nextPageLink = '';

  if (steps[0] < page) {
    prevPageLink = (
      <Link
        className="search-stepper_step search-stepper_step--back"
        to={linkToPage(page - 1)}>
        <Icon.Back />
      </Link>
    );
  }

  if (page < lastPage) {
    nextPageLink = (
      <Link
        className="search-stepper_step search-stepper_step--forward"
        to={linkToPage(page + 1)}>
        <Icon.Forward />
      </Link>
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

LinkPager.propTypes = {
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  query: PropTypes.object.isRequired,
  onLinkClick: PropTypes.func,
};

LinkPager.defaultProps = {
  onLinkClick: () => {},
};
