import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import NavbarLoggedIn from './NavBarLoggedIn';
import LogoutButton from '../auth/LogoutButton';

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
        <li className="nav-li">
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        { currentUser
        ?
        <>
          <NavbarLoggedIn />
        </>
        :
        <>
        <li className="nav-li">
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <button onClick={demo}>Demo</button>
        </li>
        </>
        }
        {/* <li className="nav-li">
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li className="nav-li">
        <li className="nav-li">
          <NavLink to='/report' exact={true} activeClassName='active'>
            Create
          </NavLink>
        </li className="nav-li"> */}
        {/* <li className="nav-li">
          <LogoutButton />
        </li className="nav-li"> */}
      </ul>
    </nav>
  );
}

export default NavBar;
