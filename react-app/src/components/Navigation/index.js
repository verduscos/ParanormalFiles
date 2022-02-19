import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import NavbarLoggedIn from './NavBarLoggedIn';
import LoginFormModal from '../auth/LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <NavbarLoggedIn />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  let guestNav = (
    <nav id="nav-guest">
      <ul id="nav-ul-guest">
        <li className='nav-li'>
          <NavLink exact to="/">Home</NavLink>
        </li>
        <li className='nav-li'>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </nav>
  )

  let userNav = (
    <NavbarLoggedIn />
  )

  return (
    <>
    { sessionUser ? userNav : guestNav }
    </>
  );
}

export default Navigation;
