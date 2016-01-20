import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../actions';

export function Masthead ({authenticated, userName, handleLogOut}) {
  let navBar;

  if (authenticated) {
    navBar = (<div>
        {userName} - <Link to='/minside'>Min side</Link> - <button onClick={handleLogOut}>Logg ut</button>
    </div>);
  } else {
    navBar = (<div><Link to='/login'>Logg inn</Link></div>);
  }

  return (
    <div className='masthead'>
      <h1>
        NDLA <small><Link to='/'>Læringsstier</Link></small>
      </h1>
      {navBar}
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
