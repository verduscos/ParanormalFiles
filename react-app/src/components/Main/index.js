import React from 'react';
import Navigation from '../Navigation';
import Tags from '../Tags';
import Sightings from '../sightings/Sightings';
import Footer from '../Footer'
import './Main.css';

const Main = () => {
  return (
    <div id="content-grid">
      <div id="col-1">
        <Navigation />
      </div>
      <div id="col-2">
        <Tags />
        <Footer/>
      </div>
      <div id="col-3">
        <Sightings />
      </div>
    </div>
  )
}

export default Main;
