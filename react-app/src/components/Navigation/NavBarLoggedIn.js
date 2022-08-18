import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoAlbumsOutline } from 'react-icons/io5';
import { BsBookmarks } from "react-icons/bs"
import ProfileButton from './ProfileButton';
import { getAllSightings, getBookmarks, getAllUserSightings } from "../../store/sighting"
import Logo from "./pf-logo.png"
import './Navigation.css'


const UserNav = () => {
  let currentUser = useSelector(state => state.session.user)
  let navigate = useNavigate()
  const dispatch = useDispatch()

  const fetch = (e) => {
    e.preventDefault();
    // dispatch(getAllSightings());
  }

  const fetchFavorites = (e) => {
    e.preventDefault();
    dispatch(getBookmarks(currentUser.id))
  }

  const fetchUserSightings = (e) => {
    e.preventDefault();
    navigate('/mysightings');
    dispatch(getAllUserSightings(currentUser.id))
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
        <li id="user-nav-home-btn" className="user-nav-btn"
          onClick={(e) => {
            fetch(e)
          }}
        >
          <NavLink to="/" >
            <AiOutlineHome />
          </NavLink>
        </li>
        <li
          onClick={(e) => {
            fetchFavorites(e)
          }}
          className="user-nav-btn">
          <NavLink to="/bookmarks">
            <BsBookmarks />
          </NavLink>
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
