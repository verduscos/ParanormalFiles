import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as sessionActions from "../../store/sighting"
import { BsPlusCircle } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import { loadingIcon, updateImage, removeImg, validateContent } from "./FormFuncs";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CreateNav from "./CreateNav";
import Tags from "./Tags";
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
  const [imgUrl, setImgUrl] = useState(null)
  const [displayImgBtn, setDisplayImgBtn] = useState(true);
  const [tags, setTags] = useState([])
  const [displayTagModal, setDisplayTagModal] = useState(false);


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
      setImgUrl(image.url);
      setLoading(false);
    }
  }, [imgFile])

  const createSighting = async (e) => {
    e.preventDefault()
    const payload = {
      user_id: currentUser.id,
      title: title,
      description: description,
      url: imgUrl,
      tags: [...tags]
    }

    if (!tags.length) return setErrors(["Please add at least one tag."])
    const res = await dispatch(sessionActions.createASighting(payload));
    if (!res.errors) navigate("/mysightings");
    if (res.errors) setErrors(res.errors.map(error => error.split(":")[1]));
  }

  console.log(description, "DESCRIPTION HERE");
  // todo
  // style react quill in create *
  // add html parser to sighting page *
  // add quill to edit form


  return (
    <>
      <CreateNav />
      <form onSubmit={(e) => createSighting(e)} className="sighting-form">
        <div id="sighting-form-inner">
          <button className="form-submit-btn sighting-inputs" onClick={(e) => validateContent(e, title, description, setErrors, setDisplayTagModal)}>
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
                // not displayed to UI, using above icon
                id="image-upload-default-btn"
                className="image-upload-default-btn"
                name="file"
                type="file"
                accept="image/*"
                onChange={(e) => updateImage(e, setImgFile, setDisplayImgBtn)}
              />
            </>
            : null}

          {imgUrl ?
            <div id="preview-container">
              <TiDeleteOutline
                id="preview-delete"
                onClick={(e) => (removeImg(e, setImgFile, setImgUrl, setDisplayImgBtn))}
              />
              <img className="image-preview" src={imgUrl} alt="sighting preview" />
            </div>
            : loadingIcon(loading)}

          <ReactQuill theme="snow" placeholder="Tell your story...." value={description} onChange={setDescription} />
        </div>
      </form>

      {displayTagModal ?
        <Tags errors={errors} currentUser={currentUser} tags={tags} setTags={setTags} setDisplayTagModal={setDisplayTagModal} submit={createSighting} />
        : null}
    </>
  )
}

export default CreateSightingForm;
