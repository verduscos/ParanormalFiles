import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import * as sessionActions from "../../store/sighting"
import "./sightings.css"

const Sightings = () => {
  const dispatch = useDispatch()
  let sightings = useSelector(state => state.sightings);
  let sightingsArray = Object.values(sightings);


  useEffect(() => {
    dispatch(sessionActions.getAllSightings())
  }, [dispatch])


  return (
    <div id="sightings-container">
        {/* {!sightingsArray.length ?
          <>
            <h2 id="no-results">No results found.</h2>
          </>
          : null} */}

        {sightingsArray.map((sighting, i) => (
          <ul id="sighting-card" key={sighting?.id}>
            <li key={`date-${sighting?.id}`}>
              <h4 id="sighting-author">
                {sighting?.username}
              </h4>
            </li>
            <li>
              <Link className="link" to={`/sightings/${sighting?.id}`} key={`link-${i}`}>
                <div key={`title-${sighting?.id}`}>
                  <h2 id="sighting-title">{sighting.title}</h2>
                  {/* <p className="card-text card-story">{sighting.description}</p> */}
                </div>
              </Link>
            </li>
            <li>
              <span id="sighting-date">{`${sighting?.created_at.split(' ')[2]} ${sighting.created_at.split(' ')[1]}, ${sighting.created_at.split(' ')[3]}`}</span>
              {/* <Link className="link" to={`/sightings/categories/${sighting?.category}`}>
                  <p className="category-link" key={`category-${sighting?.id}`} >{sighting?.category}</p>
                </Link> */}
            </li>
            <li>
              <Link className="link" to={`/sightings/${sighting?.id}`} key={`link-${i}-img`}>
                <img className="sighting-img" src={sighting?.image_url} alt="sighting-img"></img>
              </Link>
            </li>
          </ul>
        ))}
    </div>
  )
}

export default Sightings;
