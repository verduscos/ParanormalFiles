import React from "react";
import LoginFormModal from "../auth/LoginFormModal";
import SignupFormModal from "../auth/SignupFormModal";
import logo from "./logo-paranormal-files.png";



const SplashBg = () => {


  return (
    <div>
      <div id="splash-container">
        {/* LOGO FOR MOBILE */}
      <div id="splash-logo-container">
        <img id="splash-logo" src={logo} alt="pf-logo" />
      </div>
        <nav id="splash-guest">
          <ul id="splash-ul">
            <h1 id="splash-header">Paranormal Files</h1>
            <h2 id="splash-subheader">Discuss and share paranormal experiences.</h2>
            <LoginFormModal />
            <SignupFormModal />
          </ul>
        </nav>
      </div>
    </div>
  )
}


export default SplashBg
