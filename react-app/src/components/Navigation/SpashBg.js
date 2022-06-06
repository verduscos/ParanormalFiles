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
            <img id="splash-logo" src={logo} alt="pf-logo" />
          </li>
          <li>
            <LoginFormModal />
          </li>
        </ul>
      </nav>

      <div>
        <h1>Stay curious.</h1>
        <h2>Discuss and share paranormal experiences.</h2>
        <SignupFormModal />
      </div>
    </div>
  )
}


export default SplashBg
