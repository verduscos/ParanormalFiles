import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as sessionActions from "../../store/sighting"
import CreateNav from "./CreateNav";
import { AiOutlineLoading3Quarters, AiOutlineClose } from 'react-icons/ai';
import { BsPlusCircle } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
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
  const [tags, setTags] = useState([])
  const [displayAddImage, setDisplayAddImage] = useState(true);
  const [displayTagModal, setDisplayTagModal] = useState(false);
  const regex = /^[a-z]+(\s[a-z]+)?$/i

  console.log(tags);
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


  const removeImage = (e) => {
    e.preventDefault();
    setDisplayUrl("");
    setImageUrl(null);
    setImage("");
    setLoading(false);
    setDisplayAddImage(true);
  }
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
    if (file !== undefined) {
      setDisplayUrl(file["name"]);
      setDisplayAddImage(false);
    }
  }

  const createSighting = async (e) => {
    e.preventDefault()
    const payload = {
      user_id: currentUser.id,
      title: title,
      description: description,
      url: imageUrl,
      tags: [...tags]
    }

    const res = await dispatch(sessionActions.createASighting(payload));
    if (!res.errors) navigate("/mysightings");
    else setErrors(res.errors.map(error => error.split(":")[1]));
  }

  const autosize = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  return (
    <>
      <CreateNav />
      <form onSubmit={createSighting} className="sighting-form">
        <div id="sighting-form-inner">
          <div className="form-submit-btn sighting-inputs" onClick={() => setDisplayTagModal(true)}>Publish</div>

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

          {displayAddImage ?
            <>
              <label for="image-upload-default-btn" value="Upload Image" id="file-label">
                <BsPlusCircle />
              </label>
              <input
                id="image-upload-default-btn"
                className="image-upload-default-btn"
                name="file"
                type="file"
                accept="image/*"
                onChange={updateImage}
              />
            </>
            : null
          }
          {imageUrl ?
            <div id="preview-container">
              <TiDeleteOutline
                onClick={(e) => {
                  removeImage(e);
                }}
                id="preview-delete" />
              <img className="image-preview" src={imageUrl} alt="sighting preview" />
            </div>
            :
            loadingIcon

          }

          <textarea
            id="form-description"
            className="sighting-inputs"
            onKeyDown={(e) => {
              autosize(e)
            }}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
            type="text" value={description} placeholder="Tell your story...." />
        </div>
      </form>

      {displayTagModal ?
        <div id="form-category-image-container">
          <div id="form-category-image-container-inner">
            <p>Add some tags (up to 5) so readers know what your story is about</p>
            <AiOutlineClose id="tag-modal-exit" onClick={() => {
              setDisplayTagModal(false)
            }} />
            <input
              type="text"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  if (regex.test(e.target.value) && !tags.includes(e.target.value) && tags.length < 5) setTags(current => [...current, e.target.value]);
                }
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") e.target.value = "";
              }}
              className="tags-input"
              placeholder="Add a tag..."
            />
            <ul id="tag-container">
              {tags.map((tag, index) => (
                <div className="categories-list-item tag-item" key={index}>
                  <li className="tag-title">{tag}</li>
                  <TiDeleteOutline
                    className="tag-item-delete"
                    onClick={() => {
                      tags.splice(index, 1)
                      setTags(current => [...current])
                    }} />
                </div>
              ))}
            </ul>
            <button onClick={createSighting}>Publish</button>
          </div>
        </div>
        : null}

    </>
  )
}

export default CreateSightingForm;
