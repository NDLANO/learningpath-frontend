/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createHistory } from 'history';

import { availableLocales } from './localeConstants';
import { getLocale } from './localeSelectors';

const SelectLocale = ({ locale, pathname, search, ...rest }) => {
  const handleChange = (newLocale) => {
    const path = pathname.startsWith('/') ? pathname.substring(1) : pathname;
    createHistory().push(`/${newLocale}/${path}${search}`); // Need create new history or else basename is included
    window.location.reload();
  };

  return (
    <select onChange={(evt) => { handleChange(evt.target.value); }} value={locale} {...rest}>
      {availableLocales.map(l => <option key={l.abbreviation} value={l.abbreviation}>{l.name}</option>)}
    </select>
  );
}
;

SelectLocale.propTypes = {
  locale: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => Object.assign(
  {}, state, {
    locale: getLocale(state),
    pathname: state.routing.locationBeforeTransitions.pathname,
    search: state.routing.locationBeforeTransitions.search,
  }
);

export default connect(mapStateToProps)(SelectLocale);
