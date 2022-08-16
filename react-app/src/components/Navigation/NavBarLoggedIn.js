import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { AiOutlineHome, AiOutlineHeart } from 'react-icons/ai';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoAlbumsOutline } from 'react-icons/io5';
import { MdOutlineBookmarkAdd } from "react-icons/md";
import ProfileButton from './ProfileButton';
import * as sessionActions from "../../store/sighting"
import './Navigation.css'
import Logo from "./pf-logo.png"
import { useNavigate } from "react-router-dom";


const UserNav = () => {
  let currentUser = useSelector(state => state.session.user)
  let navigate = useNavigate()
  const dispatch = useDispatch()

  const fetch = (e) => {
    e.preventDefault();
    dispatch(sessionActions.getAllSightings());
    navigate("/");
  }

  const fetchFavorites = (e) => {
    e.preventDefault();

    // navigate('/favorites');
    // dispatch(sessionActions.getAllFavorites(currentUser.id))
  }

  const fetchUserSightings = (e) => {
    e.preventDefault();
    navigate('/mysightings');
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
          <img id="nav-logo" src={Logo} alt="pf-logo" />
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
          <MdOutlineBookmarkAdd />
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

export default UserNav;
