/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import PropTypes from "prop-types";

const ObjectSelector = (props) => {
  const {
    options,
    labelKey,
    idKey,
    input: { onChange, onBlur, value },
    disabled,
    ...rest
  } = props;
  const parse = (event) => options.find((option) => option[idKey] === event.target.value);

  return (
    <div>
      <select
        onBlur={(event) => onBlur(parse(event))}
        onChange={(event) => onChange(parse(event))}
        value={value[idKey]}
        disabled={disabled}
        {...rest.input}
      >
        {options.map((option) => (
          <option key={option[idKey] ? option[idKey] : "undefined"} value={option[idKey]}>
            {option[labelKey]}
          </option>
        ))}
      </select>
    </div>
  );
};

ObjectSelector.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  labelKey: PropTypes.string.isRequired,
  idKey: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

ObjectSelector.defaultProps = {
  disabled: false,
};

export default ObjectSelector;
