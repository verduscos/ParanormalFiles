import React from "react";
import "./NotFound.css"
import { Link } from "react-router-dom";

const NotFound = () => {


  return (
    <div id="notfound-container">
      <div id="notfound-inner">
        <div id="notfound-text">
          <h1>No Results Found</h1>
          <h2>You shouldn't be here... <Link id="home" to="/">go back.</Link></h2>
        </div>
        <div id="img-container">
          <img id="notfound-img" src="https://medium-clone-photo-bucket.s3.us-west-1.amazonaws.com/stefano-pollio-ZC0EbdLC8G0-unsplash.jpg" alt="not-found-bg" />
        </div>
      </div>
    </div>
  )
}


export default NotFound;
