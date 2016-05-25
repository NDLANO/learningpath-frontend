import React, { PropTypes } from 'react';

import classNames from 'classnames';

export default function LearningPathDuration(props) {
  const durations = [1, 2, 3, 4, 5];
  const onChange = (value) => {
    props.onChange(value.toString());
  };
  const inputChange = (evt) => {
    props.onChange(evt.target.value);
  };
  const durationClassName = (value) => classNames({
    'duration-menu-item': true,
    'duration-menu-item__selected': props.value === value.toString()
  });
  return (
    <div>
      <ul className="duration-menu">
        {durations.map(newDuration => (
          <li key={newDuration} className={durationClassName(newDuration)} onClick={() => onChange(newDuration)}> {newDuration}</li>
        ))}
      </ul>
      <input id={props.id} className="input-duration" {...props} onChange={(evt) => inputChange(evt)}></input>
      <span>{'time(r)'}</span>
    </div>
  );
}

LearningPathDuration.propTypes = {
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};
