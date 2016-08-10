/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';


const LicenseSelector = (props) => {
  const { value, licenseOptions, onChange, onBlur } = props;
  let currentValue = value;
  if (typeof value === 'string') { // Handle redux form values witch are initialized as strings
    currentValue = licenseOptions[0];
  }
  return (
    <DropdownList
      id="license"
      textField="description"
      value={currentValue}
      onBlur={() => onBlur(currentValue)}
      onChange={onChange}
      onToggle={() => {}}
      defaultValue={licenseOptions[0]}
      data={licenseOptions}
    />
  );
};

LicenseSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  licenseOptions: PropTypes.array.isRequired,
};

export default LicenseSelector;
