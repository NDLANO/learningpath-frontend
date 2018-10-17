/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import polyglot from '../../i18n';

const SelectSortTiles = ({ sortKey, onChange, className }) => (
  <select className={className} value={sortKey} onChange={onChange}>
    <option value="title">{polyglot.t('tilePage.order.title')}</option>
    <option value="-lastUpdated">{polyglot.t('tilePage.order.newest')}</option>
    <option value="lastUpdated">{polyglot.t('tilePage.order.oldest')}</option>
    <option value="status">{polyglot.t('tilePage.order.status')}</option>
  </select>
);

SelectSortTiles.propTypes = {
  onChange: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
};

export default SelectSortTiles;
