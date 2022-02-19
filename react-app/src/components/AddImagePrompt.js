import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as sessionActions from "../store/sighting"


const UploadPrompt = () => {
  const dispatch = useDispatch()

  let sightings = useSelector(state => state.sightings);
  let sightingsArray = Object.keys(sightings)
  let newId = parseInt(sightingsArray[sightingsArray.length - 1])
  console.log(newId)

  useEffect(() => {
    dispatch(sessionActions.getAllSightings())
  }, [dispatch])

  return (
    <>
      <h1>Upload Images?</h1>
      <Link to={`/sightings/${newId}/images`}>Add Images</Link>
      <Link to={`/`}>Skip</Link>
    </>
  )
}


export default UploadPrompt;
