import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import * as sessionActions from "../../store/sighting"
import "./sightings.css"

const Sightings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [displayFetchBtn, setDisplayFetchBtn] = useState(true);
  const currentUser = useSelector(state => state.session.user)
  const sightings = useSelector(state => state.sightings);
  const exhausted = useSelector(state => state.sightings.exhausted);
  let sightingsArray = Object.values(sightings?.all);
  let id = sightingsArray[0]?.id;
  sightingsArray = sightingsArray.reverse();

  const setCurrentSighting = (e, id) => {
    e.preventDefault();
    navigate(`/sightings/${id}`);
    dispatch(sessionActions.getCurrentSightingThunk(sightings.all[id]));
  }

  const location = useLocation();
  let path = location.pathname;
  console.log(path, "PAHTHTHTTHHT")

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
    } else if (path === "/bookmarks") {
      dispatch(sessionActions.getBookmarks(currentUser.id));
      setDisplayFetchBtn(false);
    } else if (path === "/mysightings") {
      dispatch(sessionActions.getAllUserSightings(currentUser.id));
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
            { path.includes("search") && sightingsArray.length ? <h2> <span id="search-header">Results for</span> {path.split("/")[3]}</h2> : null }
          {sightingsArray.map((sighting, i) => (
            <Link className="link" to={`/sightings/${sighting?.id}`} key={`link-${i}-img`}>

            <div id="sighting-card" key={i}>
              <ul id="sighting-details" key={sighting?.id}>
                <li key={`date-${sighting?.id}`}>
                  <h4 id="sighting-author">
                    {sighting?.username}
                  </h4>
                </li>
                <li key={`link-${i}`}>
                  <div className="link">
                    <div key={`title-${sighting?.id}`}
                      onClick={(e) => {
                        setCurrentSighting(e, sighting?.id);
                      }}>
                      <h2 id="sighting-title">{sighting.title}</h2>
                      <p className={`sighting-story ${sighting.image_url ? "" : "no-img"}`}>{sighting.description}</p>
                    </div>
                  </div>
                </li>
                <li id="sighting-tag-container" key={`tag-${i}`}>
                  <span id="sighting-date">{`${sighting?.created_at?.split(' ')[2]} ${sighting?.created_at?.split(' ')[1]}`}</span>
                  <Link className="link tag" to={`/sightings/search/${sighting.sighting_tags[0]}`}>
                    <p className="category-link" key={`category-${sighting?.id}`} >{sighting.sighting_tags[0]}</p>
                  </Link>
                </li>
              </ul>
              {sighting?.image_url !== null ?
                  <img className="sighting-img" src={sighting?.image_url} alt="sighting-img"></img>
                : null}
            </div>

            </Link>

          ))}
          {fetchBtn}
        </div>
      }
    </>
  )
}

export default Sightings;
