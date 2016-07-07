import React, { PropTypes } from 'react';
import Icon from '../../common/Icon';
import { Link } from 'react-router';
import { stepNumbers } from './PagerUtil';

export default function LinkPager(props) {
  const { page, lastPage, query, onLinkClick } = props;
  const steps = stepNumbers(page, lastPage);

  const queryToPage = pageNumber => Object.assign({}, query, { page: pageNumber });
  const linkToPage = pageNumber => ({
    pathname: '/learningpaths',
    query: queryToPage(pageNumber),
  });
  const handleClickToPage = pageNumber => evt => onLinkClick(evt, queryToPage(pageNumber));

  let pageLinks = steps.map(n => {
    if (n === page) {
      return <span key={n} className="search-stepper_step search-stepper_step--active">{n}</span>;
    }
    return <Link key={n} className="search-stepper_step" to={linkToPage(n)} onClick={handleClickToPage(n)}>{n}</Link>;
  });
  let prevPageLink = '';
  let nextPageLink = '';

  if (steps[0] < page) {
    prevPageLink = (
      <Link className="search-stepper_step search-stepper_step--back" to={linkToPage(page - 1)} onClick={handleClickToPage(page - 1)} >
        <Icon.Back />
      </Link>
    );
  }

  if (page < lastPage) {
    nextPageLink = (
      <Link className="search-stepper_step search-stepper_step--forward" to={linkToPage(page + 1)} onClick={handleClickToPage(page + 1)} >
        <Icon.Forward />
      </Link>
    );
  }

  return (<div className="search-stepper">
      {prevPageLink}
      {pageLinks}
      {nextPageLink}
  </div>);
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
