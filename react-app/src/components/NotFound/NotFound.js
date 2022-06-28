import React from "react";
import { Link } from "react-router-dom";
import { GiSpaceSuit } from "react-icons/gi";
import "./NotFound.css"

const NotFound = () => {
  return (
    <div id="lost-container">
      <ul>
        <li>
          <h1 id="lost-header">404</h1>
        </li>
        <li>
          <h2 id="lost-link">There's nothing here... <Link id="home" to="/">go home.</Link></h2>
        </li>
        <li>
          <img id="lost-img" src="https://i.gifer.com/7VE.gif" />
        </li>
      </ul>
    </div>
  )
}


export default NotFound;
