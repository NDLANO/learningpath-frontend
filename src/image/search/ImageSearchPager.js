import React, { PropTypes } from 'react';
import Icon from '../../components/Icon';

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

export function stepNumbers(currentStep, lastStep) {
  const [llim, rlim] = getRange(currentStep, lastStep);

  const offset = llim;
  const length = rlim - llim + 1;

  const indexToStep = i => i + offset;
  return Array(length).fill().map((_, i) => indexToStep(i));
}


export default function ImageSearchPager(props) {
  const { page, lastPage, query, imageSearch } = props;
  const steps = stepNumbers(page, lastPage);

  const queryToPage = pageNumber => Object.assign({}, query, {page: pageNumber});

  const handleClickToPage = pageNumber => evt => {
    evt.preventDefault();
    imageSearch(queryToPage(pageNumber));
  };

  let pageLinks = steps.map(n => {
    if (n === page) {
      return <span key={n} className="search-stepper_step search-stepper_step--active">{n}</span>;
    }
    return <button key={n} className="search-stepper_step" onClick={handleClickToPage(n)}>{n}</button>;
  });
  let prevPageLink = '';
  let nextPageLink = '';

  if (steps[0] < page) {
    prevPageLink = (
      <button className="search-stepper_step search-stepper_step--back" onClick={handleClickToPage(page - 1)} >
        <Icon.Back />
      </button>
    );
  }

  if (page < lastPage) {
    nextPageLink = (
      <button className="search-stepper_step search-stepper_step--forward" onClick={handleClickToPage(page + 1)} >
        <Icon.Forward />
      </button>
    );
  }

  return (<div className="search-stepper">
      {prevPageLink}
      {pageLinks}
      {nextPageLink}
  </div>);
}

ImageSearchPager.propTypes = {
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  query: PropTypes.object.isRequired,
  imageSearch: PropTypes.func.isRequired,
};
