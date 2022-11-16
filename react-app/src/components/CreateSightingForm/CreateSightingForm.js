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
  const [errors, setErrors] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imgFile, setImgFile] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [displayImgBtn, setDisplayImgBtn] = useState(true);
  const [tags, setTags] = useState([])
  const [displayTagModal, setDisplayTagModal] = useState(false);
  const regex = /^[a-z]+(\s[a-z]+)?$/i


  useEffect(async () => {
    if (imgFile !== "") setLoading(true);
    // avoids posting with empty files
    else return;
    const formData = new FormData();
    formData.append("image", imgFile);
    const res = await fetch(`/api/sightings/image`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const image = await res.json();
      setImageUrl(image.url);
      setLoading(false);
    }
  }, [imgFile])

  const loadingIcon = (
    loading ?
      <div id="loading-container">
        < AiOutlineLoading3Quarters />
      </div >
      : null
  )

  const autosize = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const removeImage = (e) => {
    e.preventDefault();
    setImgFile("");
    setImageUrl("");
    setDisplayImgBtn(true);
  }

  const updateImage = (e) => {
    const file = e.target.files[0];
    if (file !== undefined) {
      setImgFile(file);
      setDisplayImgBtn(false);
    }
  }

  const validateContent = (e) => {
    e.preventDefault();
    const currentErrors = [];
    if (title.length < 4 || title.length > 100) currentErrors.push("Title must be between 5-100 characters.");
    if (description.length < 4 || description.length > 3000) currentErrors.push("Description must be between 5-3000 characters.");
    setErrors(currentErrors);
    if (!currentErrors.length) setDisplayTagModal(true);
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

    if (!tags.length) return setErrors(["Please add at least one tag."])
    const res = await dispatch(sessionActions.createASighting(payload));
    if (!res.errors) navigate("/mysightings");
    if (res.errors) setErrors(res.errors.map(error => error.split(":")[1]));
  }


  return (
    <>
      <CreateNav />
      <form onSubmit={(e) => createSighting(e)} className="sighting-form">
        <div id="sighting-form-inner">
          <button className="form-submit-btn sighting-inputs" onClick={(e) => validateContent(e)}>
            Publish
          </button>

          {errors?.map(error => <li className="error-mssg">{error}</li>)}

          <input
            id="form-title"
            className="sighting-inputs"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {displayImgBtn ?
            <>
              <label htmlFor="image-upload-default-btn" value="Upload Image" id="file-label">
                <span title="Add an image.">
                  <BsPlusCircle />
                </span>
              </label>
              <input
                id="image-upload-default-btn"
                className="image-upload-default-btn"
                name="file"
                type="file"
                accept="image/*"
                onChange={(e) => updateImage(e)}
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
            {errors?.map(error => (
              <li className="error-mssg">{error}</li>
            ))}
            <p id="tag-header">Publishing to: <b>{currentUser.username}</b></p>
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
            <p id="tag-instruc"><i>Press enter to add tag.</i></p>
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
            <button onClick={(e) => createSighting(e)} id="submit-btn" className="form-submit-btn sighting-inputs">Publish now</button>
          </div>
        </div>
        : null}

    </>
  )
}

export default CreateSightingForm;
