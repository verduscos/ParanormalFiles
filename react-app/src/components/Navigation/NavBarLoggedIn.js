import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoAlbumsOutline } from 'react-icons/io5';
import { BsBookmarks } from "react-icons/bs"
import ProfileButton from './ProfileButton';
import Logo from "./pf-logo.png"
import './Navigation.css'


const UserNav = () => {
  const currentUser = useSelector(state => state.session.user);

  return (
    <nav id="user-nav-container">
      <ul>
        <li id="user-nav-home-logo">
          <NavLink to="/">
            <img src={Logo} alt="pf-logo" />
          </NavLink>
        </li>
        <li id="user-nav-home-btn" className="user-nav-btn">
          <NavLink to="/" className="user-nav-btn">
            <AiOutlineHome />
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookmarks" className="user-nav-btn">
            <BsBookmarks />
          </NavLink>
        </li>
        <li>
          <NavLink to="/mysightings" className="user-nav-btn">
            <IoAlbumsOutline />
          </NavLink>
        </li>
        <li id="user-nav-report-btn">
          <NavLink to='/report' className="user-nav-btn">
            <IoIosAddCircleOutline />
          </NavLink>
        </li>
        <li className="user-nav-btn">
          <ProfileButton user={currentUser} />
        </li>
      </ul>
    </nav>
  )
}

export default UserNav;
