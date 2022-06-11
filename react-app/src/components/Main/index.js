import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navigation from '../Navigation';
import Tags from '../Tags';
import Sightings from '../sightings/Sightings';
import Footer from '../Footer'
import './Main.css';

const Main = () => {
  const dispatch = useDispatch()
  let currentUser = useSelector(state => state.session.user)
  const [navId, setNavId] = useState("guest-nav");

  useEffect(() => {
    if (currentUser) setNavId("user-nav");
  }, [dispatch])

  return (
    <div id="content-grid">
      <div id="guest-nav">
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
