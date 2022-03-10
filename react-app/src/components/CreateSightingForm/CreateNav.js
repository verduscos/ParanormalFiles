import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import ProfileButton from "../Navigation/ProfileButton";
import logo from "../Navigation/logo-paranormal-files.png"


const CreateNav = () => {
  let currentUser = useSelector(state => state.session.user)


  return (
    <nav id="create-nav">
      <ul>
        <div id="create-nav-link">
        <NavLink to="/"><img src={logo} alt="paranormal-files-logo" /></NavLink>
        <span>Draft in {currentUser.username}</span>
        </div>
        <ProfileButton />
      </ul>
    </nav>
  )
}


export default CreateNav;
