import React from "react";
import { VscGithub } from "react-icons/vsc"
import { BsLinkedin } from "react-icons/bs"
import "./Footer.css"

const Footer = () => {


  return (
    <footer id="footer-container">
      <ul id="test8">
        <li>
          <p>Developed by Eddie Verdusco</p>
        </li>
        <li className='social-link' key="github-link">
          <a href={"https://github.com/verduscos"} target="_blank" rel="noreferrer"><VscGithub /></a>
        </li>
        <li className='social-link' key="linkedin-link">
          <a href={"https://www.linkedin.com/in/eddie-verdusco/"} target="_blank" rel="noreferrer"><BsLinkedin /></a>
        </li>
      </ul>
    </footer>
  )
}


export default Footer;
