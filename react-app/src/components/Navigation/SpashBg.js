import React from "react";
import LoginFormModal from "../auth/LoginFormModal";
import SignupFormModal from "../auth/SignupFormModal";
import logo from "./logo-paranormal-files.png";
import './GuestNav.css';

const SplashBg = () => {
  return (
    <div id="guest-nav-container">
      <nav id="guest-nav">
        <ul>
          <li>
          <img id="guest-nav-logo" src={logo} alt="pf-logo" />
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


export default SplashBg
