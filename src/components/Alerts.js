import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Icon from './Icon';
import classNames from 'classnames';
import {clearMessages} from '../actions';

const priorities = {'info': 0, 'success': 1, 'warning': 2,  'danger': 3 };

export function Alerts({dispatch, messages}) {

  let isHidden = messages.length == 0;
  let overlayClasses = classNames({
    'alert-overlay': true,
    'alert-overlay--hidden': isHidden
  });

  let highestAlert = messages
    .map(m => m.severity)
    .reduce((prev, current) => priorities[current] > priorities[prev] ? current : prev, 'info');

  return (<div className={overlayClasses}>
    <div className={`alert alert--${highestAlert}`}>
      <button className='alert_dismiss un-button' onClick={() => dispatch(clearMessages())}>
        <Icon.Clear />
      </button>
      <div className='alert_msg'>
        <ul>
          {messages.map(message => (<li key={message.message}>{message.message}</li>))}
        </ul>
      </div>
    </div>
  </div>);
}

Alerts.propTypes = {
  messages: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(state => state)(Alerts);
