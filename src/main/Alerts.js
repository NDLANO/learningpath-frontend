/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Icon from '../common/Icon';
import { timeoutMessage, clearAllMessages, clearMessage } from '../messages/messagesActions';

const priorities = { info: 0, success: 1, warning: 2, danger: 3 };

const Action = ({ title, onClick }) =>
  <strong style={{ float: 'right' }}><button onClick={onClick} className="un-button">{title}</button></strong>;

Action.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Message = ({ message, dispatch }) => {
  const onClick = () => {
    message.action.onClick();
    dispatch(clearMessage(message.id));
  };

  return <li key={message.id}>{message.message} {message.action ? <Action title={message.action.title} onClick={onClick} /> : null}</li>;
};

Message.propTypes = {
  message: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export function Alerts({ dispatch, messages }) {
  const isHidden = messages.length === 0;
  let overlayClasses = classNames({
    'alert-overlay': true,
    'alert-overlay--hidden': isHidden,
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
          {messages.map(message => (
            <Message dispatch={dispatch} message={message} />
          ))}
        </ul>
      </div>
    </div>
  </div>);
}

Alerts.propTypes = {
  messages: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => state)(Alerts);
