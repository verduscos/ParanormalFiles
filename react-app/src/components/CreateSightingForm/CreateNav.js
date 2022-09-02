import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import ProfileButton from "../Navigation/ProfileButton";
import Logo from '../Navigation/pf-logo.png';


const CreateNav = () => {
  let currentUser = useSelector(state => state.session.user);

  return (
    <nav id="create-nav">
      <ul>
        <li id="create-nav-home-link">
          <NavLink to="/"><img id="pf-logo" src={Logo} alt="pf-logo" /></NavLink>
          <span>Draft in {currentUser.username}</span>
        </li>
        <li className="user-nav-btn">
          <ProfileButton user={currentUser} createnav={true} />
        </li>
      </ul>
    </nav>
  )
}

export default CreateNav;
