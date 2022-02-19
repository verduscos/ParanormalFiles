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
      {sightingsArray.map((sighting, i) => (
        <ul id="sighting-card" key={sighting?.id}>
          {/* <li key={sighting.id}>{sighting.location}</li> */}
          <div>
            <li className="card-r1" key={`date-${sighting?.id}`}>
              <p>{sighting?.username}</p>
              {/* TODO
                  FIX DATE FORMAT
              */}
              <p>{sighting?.date}</p>
            </li>
            <Link className="link" to={`/sightings/${sighting?.id}`} key={`link-${i}`}>
              <div key={`title-${sighting?.id}`}>
                <h2 className="card-text">{sighting.title}</h2>
                <p className="card-text card-story">{sighting.description}</p>
              </div>
            </Link>
            <Link className="link" to={`/sightings/${sighting?.category}`}>
              <li className="category-link" key={`category-${sighting?.id}`} >{sighting?.category}</li>
            </Link>
          </div>
          <Link className="link card-img" to={`/sightings/${sighting?.id}`} key={`link-${i}-img`}>
            <img className="card-img" src={sighting?.sighting_images[0]} alt="sighting-img"></img>
          </Link>
        </ul>
      ))}
    </div>
  )
}

export default Sightings;
