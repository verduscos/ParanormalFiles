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
    <>
      <h1>Hello, World!</h1>
      {sightingsArray.map((sighting, i) => (
        <Link to={`/sightings/${sighting?.id}`} key={`link-${i}`}>
          <ul id="sighting-card" key={sighting?.id}>
            {/* <li key={sighting.id}>{sighting.location}</li> */}
            <li key={`date-${sighting?.id}`}>{sighting?.date}</li>
            <li key={`title-${sighting?.id}`}>{sighting?.title}</li>
            <li key={`category-${sighting?.id}`}>{sighting?.category}</li>
            <img src={sighting?.sighting_images[0]} alt="sighting-img"></img>
          </ul>
        </Link>
      ))}
    </>
  )
}

export default Sightings;
