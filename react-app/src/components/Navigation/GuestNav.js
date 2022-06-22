import React from "react";
import LoginFormModal from "../auth/LoginFormModal";
import SignupFormModal from "../auth/SignupFormModal";
import { NavLink } from "react-router-dom";
import Logo from './pf-logo.png';
import './GuestNav.css';

const GuestNav = () => {
  return (
    <div id="guest-nav-container">
      <nav id="guest-nav">
        <ul>
          <li>
          <NavLink to='/'>
            <img id="guest-nav-logo" src={Logo} alt="pf-logo" />
          </NavLink>
          </li>
          <li>
            <LoginFormModal />
          </li>
        </ul>
      </nav>

      <div id="headings-container">
        <h1 id="guest-header">Stay curious.</h1>
        <h3 id="guest-sub-header">Discuss and share paranormal experiences.</h3>
        <SignupFormModal />
      </div>
    </div>
  )
}

export default GuestNav;
