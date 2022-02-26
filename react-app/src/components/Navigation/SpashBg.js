import React from "react";
import { NavLink } from 'react-router-dom';
import LoginFormModal from "../auth/LoginFormModal";
import SignupFormModal from "../auth/SignupFormModal";



const SplashBg = () => {


  return (
    <div>
      <img id="header-img" src="https://thedarkestblog.com/wp-content/uploads/2016/10/The-Darkest-Blog-Forest.jpg" />
      <div id="splash-margin"></div>

      <nav id="splash-guest">
        <ul id="splash-ul">
          <h1 id="splash-header">Paranormal Files</h1>
          <LoginFormModal />
          <SignupFormModal />
        </ul>
      </nav>
    </div>
  )
}


export default SplashBg