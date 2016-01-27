import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../actions';

export function Masthead ({authenticated, userName, handleLogOut}) {
  let navBar;

  if (authenticated) {
    navBar = (
      <ul>
        <li><Link to='/'>Læringsstier</Link></li>
        <li><Link to='/minside'>Min side</Link></li>
        <li>{userName}</li>
        <li><button onClick={handleLogOut}>Logg ut</button></li>
      </ul>
    );
  } else {
    navBar = (
      <ul>
        <li><Link to='/'>Læringsstier</Link></li>
        <li><Link to='/login'>Logg inn</Link></li>
      </ul>
    );
  }

  return (
    <nav className='shadow'>
      <img src='/assets/logo.png' alt='Nasjonal digital læringsarena' className='logo' />
      {navBar}
    </nav>
  );
}

Masthead.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  userName: PropTypes.string
};

Masthead.defaultProps = {
  userName: '',
  handleLogOut: function () {}
};

const userName = user => [user.first_name, user.middle_name, user.last_name].join(' ');
const selectUserName = state => state.authenticated ? userName(state.user) : '';

const mapStateToProps = (state) => Object.assign({}, state, {
  userName: selectUserName(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ handleLogOut: logout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Masthead);
