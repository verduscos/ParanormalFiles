import React from 'react';
import { useSelector } from 'react-redux';
import NavbarLoggedIn from './NavBarLoggedIn';
import SplashBg from './SpashBg';
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let userNav = (
    <NavbarLoggedIn />
  )

  return (
    <>
      {sessionUser ? userNav : <SplashBg />}
    </>
  );
}

export default Navigation;
