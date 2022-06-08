import React from 'react';
import SplashBg from '../Navigation/SpashBg';
import Navigation from '../Navigation';
import Tags from '../Tags';
import Sightings from '../sightings/Sightings';
import './Main.css';

const Main = () => {


  return (
    <div id="content-grid">
      <div id="col-1">
        <Navigation />
      </div>
      <div id="col-2">
        <Tags />
      </div>
      <div id="col-3">
        <Sightings />
      </div>
    </div>
  )
}

export default Main;
