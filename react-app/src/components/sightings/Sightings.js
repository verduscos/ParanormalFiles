import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/sighting"
import "./sightings.css"

const Sightings = () => {
  const dispatch = useDispatch()
  let sightings = useSelector(state => state.sightings);
  let valueArray = Object.values(sightings);


  useEffect(() => {
    dispatch(sessionActions.getAllSightings())
  }, [dispatch])


  return (
    <>
      <h1>Hello, World!</h1>
      {valueArray.map(sighting => (
        <ul id="sighting-card" key={sighting.id}>
          <li key={sighting.id}>{sighting.date}</li>
          {/* <li key={sighting.id}>{sighting.location}</li> */}
          <li key={sighting.id}>{sighting.title}</li>
          <li key={sighting.id}>{sighting.description}</li>
          <li key={sighting.id}>{sighting.category}</li>
        </ul>
      ))}
    </>
  )
}

export default Sightings;
