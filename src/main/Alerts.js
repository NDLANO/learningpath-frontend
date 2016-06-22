import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Icon from '../components/Icon';
import classNames from 'classnames';
import { timeoutMessage, clearAllMessages } from '../messages/messagesActions';

const priorities = {info: 0, success: 1, warning: 2, danger: 3 };

export function Alerts({dispatch, messages}) {
  const isHidden = messages.length === 0;
  let overlayClasses = classNames({
    'alert-overlay': true,
    'alert-overlay--hidden': isHidden
  });

  const highestAlert = messages
    .map(m => m.severity)
    .reduce((prev, current) => {
      if (priorities[current] > priorities[prev]) {
        return current;
      }
      return prev;
    }, 'info');

  messages.filter(m => m.timeToLive > 0).forEach(item => dispatch(timeoutMessage(item)));

  return (<div className={overlayClasses}>
    <div className={`alert alert--${highestAlert}`}>
      <button className="alert_dismiss un-button" onClick={() => dispatch(clearAllMessages())}>
        <Icon.Clear />
      </button>
      <div className="alert_msg">
        <ul>
          {messages.map(message => (<li key={message.id}>{message.message}</li>))}
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
