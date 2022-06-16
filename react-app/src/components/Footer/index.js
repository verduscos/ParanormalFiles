import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { IoLogoGithub } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import "./Footer.css"

const Footer = () => {


  return (
    <footer id="footer-container">
      <ul>
        <li id="footer-dev">
          <p>Developed by Eddie Verdusco</p>
        </li>
        <li className='social-link' key="github-link">
          <a href={"https://github.com/verduscos"} target="_blank" rel="noreferrer"><IoLogoGithub /></a>
          <a href={"https://verduscos.github.io/portfolio/"} target="_blank" rel="noreferrer"><FaUserCircle /></a>
          <a href={"https://www.linkedin.com/in/eddie-verdusco/"} target="_blank" rel="noreferrer"><BsLinkedin /></a>
        </li>
        {/* <li className='social-link' key="portfolio-link">
        </li>
        <li className='social-link' key="linkedin-link">
        </li> */}
      </ul>
    </footer>
  )
}

export default Footer;
