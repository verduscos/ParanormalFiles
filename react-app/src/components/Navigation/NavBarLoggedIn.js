import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { AiOutlineHome, AiOutlineHeart } from 'react-icons/ai';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoAlbumsOutline } from 'react-icons/io5';

import ProfileButton from './ProfileButton';
import * as sessionActions from "../../store/sighting"
import './Navigation.css'
import logo from "./logo-paranormal-files.png"




const NavbarLoggedIn = () => {
  let currentUser = useSelector(state => state.session.user)
  const history = useHistory()
  const dispatch = useDispatch()


  const fetch = (e) => {
    e.preventDefault()

    // dispatch(sessionActions.getAllSightings())
    history.push("/")
  }

  const fetchFavorites = (e) => {
    e.preventDefault()

    history.push("/myfavorites")
  }

  const fetchUserSightings = (e) => {
    e.preventDefault()

    // dispatch(sessionActions.getAllUserSightings(currentUser.id))
    history.push("/mysightings")
  }


  return (
    <nav id="user-nav">
      <div id="nav-link-container">
        <div id="home">
          <NavLink to='/' activeclassname='active'>
            <img src={logo} alt="paranormal-files-logo" />
          </NavLink>
        </div>
        <div id="user-site-nav-links">
          <div
            onClick={(e) => {
              fetch(e)
            }}
            activeclassname='active' className="user-nav-btn">
            <AiOutlineHome />
          </div>



          <div
            onClick={(e) => {
              fetchFavorites(e)
            }}
            activeclassname='active' className="user-nav-btn">
            <AiOutlineHeart />
          </div>
          {/* <NavLink to='/sightings/favorites' exact={true} activeClassName='active'>
          </NavLink> */}
          <div
            onClick={(e) => {
              fetchUserSightings(e)
            }}
             activeclassname='active' className="user-nav-btn">
            <IoAlbumsOutline />
          </div>
          <NavLink id="report-link" to='/report' activeclassname='active'>
            <IoIosAddCircleOutline />
          </NavLink>
        </div>
        <div id="user-btn">
          {/* <LogoutButton /> */}
          <ProfileButton user={currentUser} />
        </div>
      </div>
    </nav>
  )
}


export default NavbarLoggedIn;
