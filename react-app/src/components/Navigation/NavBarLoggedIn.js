import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { AiOutlineHome, AiOutlineHeart } from 'react-icons/ai';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoAlbumsOutline } from 'react-icons/io5';
import './Navigation.css'



const NavbarLoggedIn = () => {

  return (
    <nav id="user-nav">
      <div id="nav-link-container">
        <div id="home">
          <NavLink to='/' exact={true} activeClassName='active'>
            Logo
          </NavLink>
        </div>
        <div id="user-site-nav-links">
          <NavLink to='/' exact={true} activeClassName='active'>
            <AiOutlineHome />
          </NavLink>
          <NavLink to='/sightings/favorites' exact={true} activeClassName='active'>
            <AiOutlineHeart />
          </NavLink>
          <NavLink to='/mysightings' exact={true} activeClassName='active'>
            <IoAlbumsOutline />
          </NavLink>
          <NavLink id="report-link" to='/report' exact={true} activeClassName='active'>
            <IoIosAddCircleOutline />
          </NavLink>
        </div>
        <div id="user-btn">
          <LogoutButton />
        </div>
      </div>
    </nav>
  )
}


export default NavbarLoggedIn;
