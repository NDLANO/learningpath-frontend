/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

export default function LearningPathDuration(props) {
  const durations = [1, 2, 3, 4, 5];
  const onChange = (value) => {
    props.input.onChange(value.toString());
  };
  const inputChange = (evt) => {
    props.input.onChange(evt.target.value);
  };
  const durationClassName = value => classNames({
    'duration-menu-item': true,
    'duration-menu-item__selected': props.input.value === value.toString(),
  });
  return (
    <div>
      <ul className="duration-menu">
        {durations.map(newDuration => (
          <li key={newDuration} className={durationClassName(newDuration)} onClick={() => onChange(newDuration)}> {newDuration}</li>  // eslint-disable-line jsx-a11y/no-static-element-interactions
        ))}
      </ul>
      <input id={props.id} className="input-duration" {...props.input} onChange={evt => inputChange(evt)} />
      <span>{'time(r)'}</span>
      <br />
      {props.meta.touched && props.meta.error && <span className="error_message error_message--red">{props.meta.error}</span>}
    </div>
  );
}

LearningPathDuration.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  meta: PropTypes.object.isRequired,
};
