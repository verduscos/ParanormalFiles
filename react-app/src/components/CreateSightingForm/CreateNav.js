import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import ProfileButton from "../Navigation/ProfileButton";


const CreateNav = () => {
  let currentUser = useSelector(state => state.session.user)


  return (
    <nav id="create-nav">
      <ul>
        <div id="create-nav-link">
        <NavLink to="/">logo </NavLink>
        <span>Draft in {currentUser.username}</span>
        </div>
        {/* <li>logo <span>Draft in {currentUser.username}</span></li> */}
        <ProfileButton />
      </ul>
    </nav>
  )
}


export default CreateNav;
