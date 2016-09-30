/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';

const ObjectSelector = (props) => {
  const { options, labelKey, idKey, input: { onChange, onBlur, value }, ...rest } = props;

  const parse = (event) => options.find(option => option[idKey] === event.target.value);
  return (
    <select
      onBlur={event => onBlur(parse(event))}
      onChange={event => onChange(parse(event))}
      value={value[idKey]}
      {...rest.input}
    >
      {options.map(option =>
        <option key={option[idKey] ? option[idKey] : 'undefined'} value={option[idKey]}>{option[labelKey]}</option>
      )}
    </select>
  );
};

ObjectSelector.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  labelKey: PropTypes.string.isRequired,
  idKey: PropTypes.string.isRequired,
};

export default ObjectSelector;
