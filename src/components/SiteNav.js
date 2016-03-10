import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import LabeledIcon from './LabeledIcon';

export default function SiteNav ({authenticated, userName}) {
  let myPage, logInOut;

  if (authenticated) {
    myPage = (
      <li className='site-nav_item'>
        <Link to='/minside' className='site-nav_link'>
          <LabeledIcon.Apps labelText='Mine læringsstier' />
        </Link>
      </li>
    );

    logInOut = (
      <li className='site-nav_item'>
        <Link to='/logout' className='site-nav_link'>
          <LabeledIcon.Exit labelText={`Logg ut ${userName}`} />
        </Link>
      </li>
    );
  } else {
    logInOut = (
      <li className='site-nav_item'>
        <Link to='/login' className='site-nav_link'>
          <LabeledIcon.Exit labelText='Logg inn' />
        </Link>
      </li>
    );
  }

  return (
    <div className='site-nav'>
      <ul className='site-nav_list'>
        <li className='site-nav_item'>
          <Link to='/learningpaths' className='site-nav_link'>
            <LabeledIcon.Search labelText='Finn læringssti' />
          </Link>
        </li>
        {myPage}
        {logInOut}
      </ul>
    </div>
  );
}

SiteNav.propTypes = {
  authenticated: PropTypes.bool,
  userName: PropTypes.string
};

SiteNav.defaultProps = {
  authenticated: false,
  userName: ''
};
