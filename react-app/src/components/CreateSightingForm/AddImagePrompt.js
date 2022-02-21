import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as sessionActions from "../../store/sighting"
import "./CreateSightingForm.css"


const UploadPrompt = () => {
  const dispatch = useDispatch()

  let sightings = useSelector(state => state.sightings);
  let sightingsArray = Object.keys(sightings)
  let newId = parseInt(sightingsArray[sightingsArray.length - 1])

  useEffect(() => {
    dispatch(sessionActions.getAllSightings())
  }, [dispatch])

  return (
    <div id="image-prompt">
      <h1>Upload an image?</h1>
      <Link id="add-img" to={`/sightings/${newId}/images`}>Add Image</Link>
      <Link id="skip" to={`/`}>Skip</Link>
    </div>
  )
}


export default UploadPrompt;
