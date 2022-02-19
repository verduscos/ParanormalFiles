import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';


const NavbarLoggedIn = () => {

  return (
    <nav id="user-nav">
          <NavLink to='/' exact={true} activeClassName='active'>
            Report
          </NavLink>
          <NavLink to='/report' exact={true} activeClassName='active'>
            Report
          </NavLink>
          <LogoutButton />
    </nav>
  )
}


export default NavbarLoggedIn;
