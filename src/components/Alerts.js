import React from 'react';

import Icon from './Icon';
import classNames from 'classnames';

export default function Alerts(props) {
  let isHidden = false;

  let overlayClasses = classNames({
    'alert-overlay': true,
    'alert-overlay--hidden': isHidden
  });

  let messages = (<ul>
    <li>Todo: solve NDLA-164</li>
  </ul>);

  return (<div className={overlayClasses}>
    <div className='alert alert--info'>
      <button className='alert_dismiss un-button'>
        <Icon.Clear />
      </button>
      <div className='alert_msg'>{messages}</div>
    </div>
  </div>);
}
