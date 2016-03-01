import React, { PropTypes } from 'react';
import Icon from './Icon';
import { Link } from 'react-router';

export function getRange(current, last) {
  let r1 = current - 2;
  let r2 = current + 2;

  if (r1 < 1) {
    r2 -= r1 - 1;
  }

  if (r2 > last) {
    r1 -= r2 - last;
  }

  return [Math.max(r1, 1), Math.min(r2, last)];
}

export function stepNumbers (currentStep, lastStep) {
  let [llim, rlim] = getRange(currentStep, lastStep);

  let offset = llim;
  let length = rlim - llim + 1;

  const indexToStep = i => i + offset;
  return Array(length).fill().map((_,i) => indexToStep(i));
}


export default function SearchResultPager (props) {
  let { page, lastPage, query, onLinkClick } = props;
  let steps = stepNumbers(page, lastPage);

  const queryToPage = pageNumber => Object.assign({}, query, {page: pageNumber});
  const linkToPage = pageNumber => ({
    pathname: '/learningpaths',
    query: queryToPage(pageNumber)
  });
  const handleClickToPage = pageNumber => evt => onLinkClick(evt, queryToPage(pageNumber));

  let pageLinks = steps.map(n => n === page ?
      <span key={n} className='search-stepper_step search-stepper_step--active'>{n}</span> :
      <Link key={n} className='search-stepper_step' to={linkToPage(n)} onClick={handleClickToPage(n)}>{n}</Link>
  );
  let prevPageLink = '';
  let nextPageLink = '';

  if (steps[0] < page) {
    prevPageLink = (<Link className='search-stepper_step search-stepper_step--back'
         to={linkToPage(page - 1)} onClick={handleClickToPage(page - 1)}>
      <Icon.Back />
    </Link>);
  }

  if (page < lastPage) {
    nextPageLink = (<Link className='search-stepper_step search-stepper_step--forward'
        to={linkToPage(page + 1)} onClick={handleClickToPage(page + 1)}>
      <Icon.Forward />
    </Link>);
  }

  return (<div className='search-stepper'>
      {prevPageLink}
      {pageLinks}
      {nextPageLink}
  </div>);
}

SearchResultPager.propTypes = {
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  query: PropTypes.object.isRequired,
  onLinkClick: PropTypes.func
};

SearchResultPager.defaultProps = {
  onLinkClick: function () {}
};
