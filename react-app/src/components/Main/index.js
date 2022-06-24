import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navigation from '../Navigation';
import Tags from '../Tags';
import SingleSighting from '../SingleSighting/SingleSighting';
import Comments from '../Comments/Comments';
import Sightings from '../sightings/Sightings';
import Footer from '../Footer'

import './Main.css';

const Main = () => {
  const params = useParams();
  const { sightingId } = params;
  let currentUser = useSelector(state => state.session.user)
  const [navId, setNavId] = useState("col-1-guest");
  const [sightingsId, setSightingsId] = useState("col-3-guest");
  const [tagsId, setTagsId] = useState("col-2-guest");
  const [content, setContent] = useState(<Sightings />);

  useEffect(() => {
    currentUser !== null ? setNavId("col-1-user") : setNavId("col-1-guest");
    currentUser !== null ? setSightingsId("col-3-user") : setSightingsId("col-3-guest");
    currentUser !== null ? setTagsId("col-2-user") : setTagsId("col-2-guest");
  }, [currentUser])

  useEffect(() => {
    sightingId ? setContent(<><SingleSighting /> <Comments /></>) : setContent(<Sightings />);
  }, [sightingId])


  return (
    <div id="content-grid">
      <div id={navId}>
        <Navigation />
      </div>
      <div id={tagsId}>
        <Tags />
        <div id="desktop-footer">
          <Footer />
        </div>
      </div>
      <div id={sightingsId}>
        {content}
      </div>
      <div id="mobile-footer">
        <Footer />
      </div>
    </div>
  )
}

export default Main;
