import React from "react";
import "./NotFound.css"

const NotFound = () => {


  return (
    <div id="notfound-container">
        <div id="notfound-text">
          <h1>404 No Results Found</h1>
          <h2>You shouldn't be here...</h2>
        </div>
        <img id="notfound-img" src="https://medium-clone-photo-bucket.s3.us-west-1.amazonaws.com/stefano-pollio-ZC0EbdLC8G0-unsplash.jpg" />
    </div>
  )
}


export default NotFound;
