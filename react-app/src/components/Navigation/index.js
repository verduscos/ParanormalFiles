import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavbarLoggedIn from './NavBarLoggedIn';
import LoginFormModal from '../auth/LoginFormModal';
import SignupFormModal from '../auth/SignupFormModal';
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
        <SignupFormModal />
      </>
    );
  }

  let guestNav = (
    <nav id="nav-guest">
      <ul id="nav-ul-guest">
        <li className='nav-li'>
          <NavLink exact to="/">LOGO</NavLink>
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
