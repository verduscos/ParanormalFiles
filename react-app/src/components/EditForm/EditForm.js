import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import CreateNav from "../CreateSightingForm/CreateNav";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import "../CreateSightingForm/Form.css"
import * as sessionActions from "../../store/sighting"

const EditForm = () => {
  const params = useParams()
  const { sightingId } = params
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user)
  const currentSighting = JSON.parse(window.localStorage.getItem("currentSighting"));
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(currentSighting.title);
  const [description, setDescription] = useState(currentSighting.description);
  const [imageUrl, setImageUrl] = useState(currentSighting.image_url);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([])
  const [displayUrl, setDisplayUrl] = useState("")
  const [tags, setTags] = useState(currentSighting.sighting_tags.join(" "))
  const [removeTags, setRemoveTags] = useState([]);


  useEffect(() => {
    if (image === null) return;
    if (displayUrl !== "") setLoading(true);
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
        setLoading(false);
      }
    }
    fetchData();
  }, [image])

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
    setDisplayUrl(file["name"]);
  }

  const editSighting = async (e) => {
    e.preventDefault()
    const addTags = []
    const errorsArr = [];
    let includesOldTags = true;
    const uniqueTags = new Set(tags.split(" "))
    let  uniqueTagsArr = Array.from(uniqueTags)
    uniqueTagsArr = uniqueTagsArr.join(" ")

    uniqueTagsArr.split(" ").forEach(tag => {
      if (!currentSighting.sighting_tags.includes(tag) && tag !== "") {
        addTags.push(tag);
      }
      if (currentSighting.sighting_tags.includes(tag)) includesOldTags = false;
    })
    const removeTagsArr = [];
    currentSighting.sighting_tags.forEach(tag => {
      if (!uniqueTagsArr.split(" ").includes(tag)) removeTags.push(tag);
    })
    setRemoveTags(removeTagsArr);

    const payload = {
      sighting_id: sightingId,
      user_id: currentUser.id,
      title: title,
      description: description,
      image_url: imageUrl,
      tags: addTags,
      removeTags: removeTags
    }

    if (title.length < 4) errorsArr.push("Title must be at least 4 characters long.")
    if (description.length < 5) errorsArr.push("Description must be at least 5 characters long.")
    if ((addTags[0] === " " || !addTags.length) && includesOldTags) errorsArr.push("Add at least one tag.")

    setErrors(errorsArr)
    if (errorsArr.length === 0) {
      navigate(`/sightings/${sightingId}`);
      dispatch(sessionActions.updateSighting(payload));
    }
  }

  return (
    <>
      <CreateNav />
      <form className="sighting-form">
        <ul>
          <button onClick={editSighting} className="form-submit-btn sighting-inputs">Update</button>
          {errors?.map(error => (
            <li className="error-mssg" key={error}>{error}</li>
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
              className="tags-input"
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
          <div id="preview-container">
            {loadingIcon}
            {imageUrl ?
              <>
                <p className="image-title">Image preview:</p>
                <img className="image-preview" src={imageUrl} alt="sighting preview" />
              </>
              : null}
          </div>
          <p id="form-display-image-url">{displayUrl}</p>
        </ul>
      </form>
    </>
  )
}

export default EditForm;
