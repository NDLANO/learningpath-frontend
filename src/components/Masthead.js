import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../actions';

export function Masthead ({authenticated, userName, handleLogOut}) {
  let navBar;

  if (authenticated) {
    navBar = (
      <div className='site-nav'>
        <ul className='site-nav_list'>
          <li className='site-nav_item'>
            <Link to='/learningpaths' className='site-nav_link'>Finn læringssti</Link>
          </li>
          <li className='site-nav_item'>
            <Link to='/minside' className='site-nav_link'>Mine læringsstier</Link>
          </li>
          <li className='site-nav_item'>{userName}</li>
          <li className='site-nav_item'>
            <button onClick={handleLogOut} className='site-nav_bt'>Logg ut</button>
          </li>
        </ul>
      </div>
    );
  } else {
    navBar = (
      <div className='site-nav'>
        <ul className='site-nav_list'>
          <li className='site-nav_item'>
            <Link to='/learningpaths' className='site-nav_link'>Finn læringssti</Link>
          </li>
          <li className='site-nav_item'>
            <Link to='/login' className='site-nav_link'>Logg inn</Link>
          </li>
        </ul>
      </div>
    );
  }

  let logo = (
    <div className='logo'>
      <Link to='/' className='logo_link'>Nasjonal digital læringsarena</Link>
    </div>
  );

  return (
    <div className='masthead'>
      <div className='masthead_left'>
        {logo}
      </div>

      <div className='masthead_right'>
        {navBar}
      </div>
    </div>
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
