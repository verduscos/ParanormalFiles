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

    dispatch(sessionActions.getAllSightings())
    history.push("/")
  }

  const fetchFavorites = (e) => {
    e.preventDefault()

    dispatch(sessionActions.getAllFavorites(currentUser.id));
    history.push("/myfavorites")
  }

  const fetchUserSightings = (e) => {
    e.preventDefault()

    dispatch(sessionActions.getAllUserSightings(currentUser.id))
    history.push("/mysightings")
  }

  return (
    <nav id="user-nav-container">
      <ul id="nav-link-container">
        <ul id="home">
          <NavLink to='/' activeclassname='active'>
            <img src={logo} alt="paranormal-files-logo" />
          </NavLink>
        </ul>
        <ul id="user-nav-links">
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
        </ul>
        <ul id="user-btn">
          <ProfileButton user={currentUser} />
        </ul>
      </ul>
    </nav>
  )
}

export default NavbarLoggedIn;
