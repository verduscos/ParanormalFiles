import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as sessionActions from "../../store/sighting"
import CreateNav from "./CreateNav";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import "./CreateSightingForm.css";
import "./Form.css";

const CreateSightingForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user)
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [errors, setErrors] = useState([])
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null)
  const [displayUrl, setDisplayUrl] = useState("")
  const [allowSubmit, setAllowSubmit] = useState(false);


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
      setAllowSubmit(true);
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
      category: category,
      url: imageUrl
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
            <select
              className="form-select-options sighting-inputs"
              onChange={(e) => {
                setCategory(e.target.value)
              }}
              value={category}>
              <option value="categories">Select Category</option>
              <option value="UFOs">UFOs</option>
              <option value="Ghosts">Ghosts</option>
              <option value="Demons">Demons</option>
              <option value="Angels">Angels</option>
              <option value="Reincarnation">Reincarnation</option>
              <option value="Monsters">Monsters</option>
              <option value="Mandela Effect">Mandela Effect</option>
              <option value="Time Travel">Time Travel</option>
              <option value="Synchronicity">Synchronicity</option>
            </select>
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
          <p id="form-display-image-url">{displayUrl}</p>
          {loadingIcon}
          {imageUrl ? <img src={imageUrl} /> : null}
        </div>
      </form>
    </>
  )
}

export default CreateSightingForm;
