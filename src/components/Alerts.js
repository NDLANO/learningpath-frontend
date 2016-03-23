import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Icon from './Icon';
import classNames from 'classnames';
import {clearMessages} from '../actions';

export function Alerts({dispatch, messages}) {

  let isHidden = messages.length == 0;
  let overlayClasses = classNames({
    'alert-overlay': true,
    'alert-overlay--hidden': isHidden
  });

  let severities = messages.map(m => m.severity);
  let priorities = {'info': 0, 'success': 1, 'warning': 2,  'danger': 3 };
  let highestAlert = severities.reduce((prev, current) => priorities[current] > priorities[prev] ? current : prev, 'info');
  let alertClasses = classNames([`alert alert--${highestAlert}`]);

  let renderedMessages = (
    <ul>
      {messages.map(function (message) {
        return <li>{message.message}</li>;
      })}
    </ul>
  );

  return (<div className={overlayClasses}>
    <div className={alertClasses}>
      <button className='alert_dismiss un-button' onClick={() => dispatch(clearMessages())}>
        <Icon.Clear />
      </button>
      <div className='alert_msg'>{renderedMessages}</div>
    </div>
  </div>);
}

Alerts.propTypes = {
  messages: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(state => state)(Alerts);
