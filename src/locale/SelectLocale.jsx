import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { setLocale } from './localeActions';
import { getLocale } from './localeSelectors';

const SelectLocale = ({ locale, changeLocale }) =>
  <select onChange={(evt) => { changeLocale(evt.target.value); }} value={locale}>
    <option value="en">English</option>
    <option value="nb">Norsk</option>
  </select>
;

SelectLocale.propTypes = {
  locale: PropTypes.string.isRequired,
  changeLocale: PropTypes.func.isRequired,
};

const mapDispatchToProps = { changeLocale: setLocale };

const mapStateToProps = (state) => Object.assign({}, state, { locale: getLocale(state) });

export default connect(mapStateToProps, mapDispatchToProps)(SelectLocale);
