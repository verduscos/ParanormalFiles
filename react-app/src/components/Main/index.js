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
  const [navId, setNavId] = useState("col-1-guest");
  const [sightingId, setSightingId] = useState("col-3-guest");

  useEffect(() => {
    currentUser !== null ? setNavId("col-1-user") : setNavId("col-1-guest");
    currentUser !== null ? setSightingId("col-3-user") : setSightingId("col-3-guest");
  }, [currentUser])

  return (
    <div id="content-grid">
      <div id={navId}>
        <Navigation />
      </div>
      <div id="col-2">
        <Tags />
        <Footer/>
      </div>
      <div id={sightingId}>
        <Sightings />
      </div>
    </div>
  )
}

export default Main;
