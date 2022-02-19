import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import NavbarLoggedIn from './NavBarLoggedIn';
import LogoutButton from '../auth/LogoutButton';
import NavBarGuest from './NavBarGuest';

import './NavBar.css'

const NavBar = () => {
  const dispatch = useDispatch()
  let currentUser = useSelector(state => state.session.user)

  const demo = async (e) => {
    await dispatch(login("demo@aa.io", "password"))
  }

  return (
    <nav>
      <ul id="nav-ul">
        {currentUser
          ?
          <>
            <NavbarLoggedIn />
          </>
          :
          <>
            <NavBarGuest />
          </>
        }
      </ul>
    </nav>
  );
}

export default NavBar;
