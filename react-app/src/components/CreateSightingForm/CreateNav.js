import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import ProfileButton from "../Navigation/ProfileButton";
// import logo from "../Navigation/logo-paranormal-files.png"
// import Logo from '../Navigation/pf-log.png';


const CreateNav = () => {
  let currentUser = useSelector(state => state.session.user)


  return (
    <nav id="create-nav">
      <ul>
        <div id="create-nav-link">
          <NavLink to="/"><img alt="paranormal-files-logo" /></NavLink>
          <span>Draft in {currentUser.username}</span>
        </div>
        {/* <ProfileButton /> */}
        <li className="user-nav-btn">
          <ProfileButton user={currentUser} />
        </li>
      </ul>
    </nav>
  )
}


export default CreateNav;
