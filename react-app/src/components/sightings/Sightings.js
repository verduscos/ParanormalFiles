import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import * as sessionActions from "../../store/sighting"
import "./sightings.css"

const Sightings = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);
  const [displayFetchBtn, setDisplayFetchBtn] = useState(true);
  const currentUser = useSelector(state => state.session.user)
  const sightings = useSelector(state => state.sightings);
  const exhausted = useSelector(state => state.sightings.exhausted);
  let sightingsArray = Object.values(sightings?.all);
  let id = sightingsArray[0]?.id;
  sightingsArray = sightingsArray.reverse();


  const location = useLocation();
  let path = location.pathname;

  const resetLoading = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, [500])
  }

  useEffect(() => {
    if (exhausted) setDisplayFetchBtn(false);
  }, [exhausted])

  useEffect(() => {
    resetLoading();

    if (path === "/") {
      dispatch(sessionActions.getAllSightings());
      setDisplayFetchBtn(true);
    } else if (path === "/favorites") {
      dispatch(sessionActions.getAllFavorites(currentUser.id));
      setDisplayFetchBtn(false);
    } else if (path === "/mysightings") {
      dispatch(sessionActions.getAllUserSightings(currentUser?.id));
      setDisplayFetchBtn(false);
    } else {
      setDisplayFetchBtn(false);
    }
  }, [path, currentUser?.id, dispatch])

  const fetchMoreSightings = (e, id) => {
    e.preventDefault();
    dispatch(sessionActions.getAdditionalSightings(id));
  }

  const fetchBtn = (
    <>
      {
        displayFetchBtn ?
          <button id="fetch-btn" onClick={e => (fetchMoreSightings(e, id))} >Load more sightings</button> :
          null
      }
    </>
  )

  const loadingIcon = (
    <div id="loading-container">
      <AiOutlineLoading3Quarters />
    </div>
  )

  return (
    <>
      {loading ? loadingIcon :
        <div id="sightings-container">
          {!sightingsArray.length ?
            <>
              <h2>No results found.</h2>
            </>
            : null}
          {sightingsArray.map((sighting, i) => (
            <div id="sighting-card" key={i}>
              <ul id="sighting-details" key={sighting?.id}>
                <li key={`date-${sighting?.id}`}>
                  <h4 id="sighting-author">
                    {sighting?.username}
                  </h4>
                </li>
                <li key={`link-${i}`}>
                  <Link className="link" to={`/sightings/${sighting?.id}`}>
                    <div key={`title-${sighting?.id}`}>
                      <h2 id="sighting-title">{sighting.title}</h2>
                      <p className="sighting-story">{sighting.description}</p>
                    </div>
                  </Link>
                </li>
                <li id="sighting-tag-container" key={`tag-${i}`}>
                  <span id="sighting-date">{`${sighting?.created_at?.split(' ')[2]} ${sighting?.created_at?.split(' ')[1]}`}</span>
                  <Link className="link tag" to={`/sightings/search/${sighting?.category}`}>
                    <p className="category-link" key={`category-${sighting?.id}`} >{sighting?.category}</p>
                  </Link>
                </li>
              </ul>
              <Link className="link" to={`/sightings/${sighting?.id}`} key={`link-${i}-img`}>
                <img className="sighting-img" src={sighting?.image_url} alt="sighting-img"></img>
              </Link>
            </div>
          ))}
          {fetchBtn}
        </div>
      }
    </>
  )
}

export default Sightings;
