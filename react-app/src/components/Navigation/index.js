import React from 'react';
import { useSelector } from 'react-redux';
import UserNav from './NavBarLoggedIn';
import GuestNav from './GuestNav';
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      {sessionUser ? <UserNav /> : <GuestNav />}
    </>
  );
}

export default Navigation;
