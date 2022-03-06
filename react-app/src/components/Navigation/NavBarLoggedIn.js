import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
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
  let sightings = useSelector(state => state.sightings);
  let sightingsArray = Object.values(sightings);

  const fetch = (e) => {
    e.preventDefault()

    dispatch(sessionActions.getAllSightings())
    history.push("/")
  }

  const fetchUserSightings = (e) => {
    e.preventDefault()

    dispatch(sessionActions.getAllSightings())
    history.push("/mysightings")
  }

  // useEffect(() => {
  //   dispatch(sessionActions.getAllSightings())
  // }, [dispatch])

  return (
    <nav id="user-nav">
      <div id="nav-link-container">
        <div id="home">
          <NavLink to='/' exact={true} activeClassName='active'>
            <img src={logo} />
          </NavLink>
        </div>
        <div id="user-site-nav-links">
          <div
            onClick={(e) => {
              fetch(e)
            }}
            exact={true} activeClassName='active' class="user-nav-btn">
            <AiOutlineHome />
          </div>
          {/* <NavLink to='/sightings/favorites' exact={true} activeClassName='active'>
            <AiOutlineHeart />
          </NavLink> */}
          <div
            onClick={(e) => {
              fetchUserSightings(e)
            }}
            exact={true} activeClassName='active' class="user-nav-btn">
            <IoAlbumsOutline />
          </div>
          <NavLink id="report-link" to='/report' exact={true} activeClassName='active'>
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
