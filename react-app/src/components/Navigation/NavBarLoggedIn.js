import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiOutlineHeart } from 'react-icons/ai';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoAlbumsOutline } from 'react-icons/io5';
import ProfileButton from './ProfileButton';
import * as sessionActions from "../../store/sighting"
import './Navigation.css'
import Logo from "./pf-logo.png";
import LogoutButton from '../auth/LogoutButton';

const NavbarLoggedIn = () => {
  let currentUser = useSelector(state => state.session.user)
  const location = useLocation();
  console.log(location.pathname, "lkjdklasjfalsdkfjaklsdfj");
  const history = useHistory()
  const dispatch = useDispatch()

  const fetch = (e) => {
    e.preventDefault()

    dispatch(sessionActions.getAllSightings())
    history.push("/")
  }

  const fetchFavorites = async (e) => {
    e.preventDefault()

    // history.push("/")
    await history.push('/favorites')

      dispatch(sessionActions.getAllFavorites(currentUser.id))

  }

  const fetchUserSightings = (e) => {
    e.preventDefault()

    dispatch(sessionActions.getAllUserSightings(currentUser.id))
  }

  return (
    <nav id="user-nav-container">
      <ul>
        <li id="user-nav-home-logo"
          onClick={(e) => {
            fetch(e);
          }}
        >
          <img src={Logo} alt="pf-logo" />
        </li>
        <li id="user-nav-home-btn"
          onClick={(e) => {
            fetch(e)
          }}
          className="user-nav-btn">
          <AiOutlineHome />
        </li>
        <li
          onClick={(e) => {
            fetchFavorites(e)
          }}
          className="user-nav-btn">
          <AiOutlineHeart />
        </li>

        <li
          onClick={(e) => {
            fetchUserSightings(e)
          }}
          className="user-nav-btn">
          <IoAlbumsOutline />
        </li>
        <li id="user-nav-report-btn">
          <NavLink className="user-nav-btn" to='/report' activeclassname='active'>
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

export default NavbarLoggedIn;
