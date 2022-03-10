import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./ImageForm.css"
import * as sessionActions from "../../store/sighting"

const ImageForm = () => {
  const params = useParams();
  const dispatch = useDispatch()
  // const history = useHistory()
  const { sightingId } = params;
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);


  useEffect(() => {
    dispatch(sessionActions.getAllSightings())
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    // TODO
    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);

    const res = await fetch(`/api/sightings/${sightingId}/image`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      setImageLoading(false);
      // history.push("/mysightings");
    }
    else {
      setImageLoading(false);
      setImageLoading(false);
      // const data = await res.json();
      // a real app would probably use more advanced
      // error handling
    }
  }

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }


  return (
    <>
      <form id="image-form" onSubmit={handleSubmit}>
        {/* <label for="file-btn">
          Choose File
        </label> */}
        <input
        id="file-btn"

          type="file"
          accept="image/*"
          onChange={updateImage}
        />
        <button type="submit">Submit</button>
        {(imageLoading) && <p>Loading...</p>}
      </form>
    </>
  )
}


export default ImageForm;
