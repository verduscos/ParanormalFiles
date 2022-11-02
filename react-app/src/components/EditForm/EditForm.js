import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import CreateNav from "../CreateSightingForm/CreateNav";
import "../CreateSightingForm/Form.css"
import * as sessionActions from "../../store/sighting"

const EditForm = () => {
  const params = useParams()
  const { sightingId } = params
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user)
  const currentSighting = JSON.parse(window.localStorage.getItem("currentSighting"));
  const [title, setTitle] = useState(currentSighting.title);
  const [description, setDescription] = useState(currentSighting.description);
  const [category, setCategory] = useState(currentSighting.category);
  const [imageUrl, setImageUrl] = useState(currentSighting.image_url);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([])
  const [displayUrl, setDisplayUrl] = useState("")
  const [tags, setTags] = useState(currentSighting.sighting_tags.join(" "))


  useEffect(() => {
    const formData = new FormData();
    formData.append("image", image);
    const fetchData = async () => {
      const res = await fetch(`/api/sightings/image`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setImageUrl(data.url)
      }
    }
    fetchData();
  }, [image, dispatch])

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setDisplayUrl(file["name"]);
  }

  const editSighting = async (e) => {
    e.preventDefault()
    const addTags = []

    tags.split(" ").forEach(tag => {
      if (!currentSighting.sighting_tags.includes(tag)) {
        addTags.push(tag);
      }
    })
    const payload = {
      sighting_id: sightingId,
      user_id: currentUser.id,
      title: title,
      description: description,
      image_url: imageUrl,
      tags: addTags
    }

    const errorsArr = [];
    if (title.length < 4) errorsArr.push("Title must be at least 4 characters long.")
    if (description.length < 5) errorsArr.push("Description must be at least 5 characters long.")
    setErrors(errorsArr)
    if (errorsArr.length === 0) {
      // navigate(`/sightings/${sightingId}`);
      // dispatch(sessionActions.updateSighting(payload));
      console.log(addTags)
    }
  }

  return (
    <>
      <CreateNav />
      <form className="sighting-form">
        <ul>
          <button onClick={editSighting} className="form-submit-btn sighting-inputs">Update</button>
          {errors?.map(error => (

            <li className="error-mssg">{error}</li>
          ))}
          <input
            id="form-title"
            className="sighting-inputs"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Title" />
          <textarea
            id="form-description"
            className="sighting-inputs"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            placeholder="description" />
          <div className="form-category-image-container">
          <input type="text"
            onChange={(e) => {
              setTags(e.target.value)
            }}
            value={tags}
            />
            <label htmlFor="image-upload-default-btn" value="Upload Image" id="file-label">
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
        </ul>
      </form>
    </>
  )
}

export default EditForm;
