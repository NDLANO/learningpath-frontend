import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Icon from './Icon';
import classNames from 'classnames';
import {clearMessages} from '../actions';

export function Alerts({dispatch, messages}) {

  let isHidden = messages.length == 0;
  let severities = messages.map(m => m.severity)

  let removeMessages = () => {
    dispatch(clearMessages());
  };

  let severitiesContains = function (severity) {
    return severities.indexOf(severity) > -1
  }

  let overlayClasses = classNames({
    'alert-overlay': true,
    'alert-overlay--hidden': isHidden
  });

  let alertClasses = classNames({
    'alert': true,
    'alert--info' : true,
    'alert--success' : severitiesContains("success"),
    'alert--warning' : severitiesContains("warning"),
    'alert--danger' : severitiesContains("danger")
  });

  let renderedMessages = (
    <ul>
      {messages.map(function (message) {
        return <li>{message.message}</li>;
      })}
    </ul>
  );

  return (<div className={overlayClasses}>
    <div className={alertClasses}>
      <button className='alert_dismiss un-button' onClick={removeMessages}>
        <Icon.Clear />
      </button>
      <div className='alert_msg'>{renderedMessages}</div>
    </div>
  </div>);
}

Alerts.propTypes = {
  messages: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return Object.assign({}, state, {
    messages: state.messages
  });
};

export default connect(mapStateToProps)(Alerts);
