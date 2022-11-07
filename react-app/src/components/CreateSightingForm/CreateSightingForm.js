import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as sessionActions from "../../store/sighting"
import CreateNav from "./CreateNav";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import "./Form.css";

const CreateSightingForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user)
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [errors, setErrors] = useState([])
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null)
  const [displayUrl, setDisplayUrl] = useState("")
  const [tags, setTags] = useState("")
  const regex = /^(([a-z]+\s*)+)[a-z]+$/i;

  useEffect(async () => {
    if (displayUrl !== "") setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    const res = await fetch(`/api/sightings/image`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      setImageUrl(data.url);
      setLoading(false);
    }
  }, [image, dispatch])


  const loadingIcon = (
    loading ?
      <div id="loading-container">
        < AiOutlineLoading3Quarters />
      </div >
      : null
  )

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setDisplayUrl(file["name"])
  }

  const createSighting = async (e) => {
    e.preventDefault()
    const payload = {
      user_id: currentUser.id,
      title: title,
      description: description,
      url: imageUrl,
      tags: [...tags.split(" ")]
    }

    const res = await dispatch(sessionActions.createASighting(payload));
    if (!res.errors) navigate("/mysightings");
    else setErrors(res.errors.map(error => error.split(":")[1]));
  }

  return (
    <>
      <CreateNav />
      <form onSubmit={createSighting} className="sighting-form">
        <div>
          <button className="form-submit-btn sighting-inputs" >Publish</button>

          {errors?.map(error => (
            <li className="error-mssg">{error}</li>
          ))}

          <input
            id="form-title"
            className="sighting-inputs"
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            type="text" value={title} placeholder="Title" />

          <textarea
            id="form-description"
            className="sighting-inputs"
            onChange={(e) => {
              setDescription(e.target.value)
            }}
            type="text" value={description} placeholder="Tell your story...." />

          <div className="form-category-image-container">
            <input
              type="text"
              onChange={(e) => {
                setTags(e.target.value)
              }}
              className="tags-input"
            />
            <label for="image-upload-default-btn" value="Upload Image" id="file-label">
              <p>Upload Image</p>
            </label>
            <input
              id="image-upload-default-btn"
              className="image-upload-default-btn"
              name="file"
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
          </div>
          <div id="preview-container">
            {/* <p id="form-display-image-url">{displayUrl}</p> */}
            {loadingIcon}
            {imageUrl ?
              <>
                <p className="image-title">Image preview:</p>
                <img className="image-preview" src={imageUrl} alt="sighting preview" />
              </>
              : null}
          </div>
        </div>
      </form>
    </>
  )
}

export default CreateSightingForm;
