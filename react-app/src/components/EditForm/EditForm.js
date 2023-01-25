import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import CreateNav from "../CreateSightingForm/CreateNav";
import { BsPlusCircle } from "react-icons/bs";
import "../CreateSightingForm/Form.css"
import * as sessionActions from "../../store/sighting"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { validateContent, formats, loadingIcon, updateImage, removeImg } from "../CreateSightingForm/FormFuncs";
import Tags from "../CreateSightingForm/Tags";
import { TiDeleteOutline } from "react-icons/ti";


const EditForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const { sightingId } = params
  const currentUser = useSelector(state => state.session.user)
  const currentSighting = JSON.parse(window.localStorage.getItem("currentSighting"));
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([])
  const [title, setTitle] = useState(currentSighting.title);
  const [description, setDescription] = useState(currentSighting.description);
  const [imgFile, setImgFile] = useState("")
  const [imgUrl, setImgUrl] = useState(currentSighting.image_url);
  const [displayImgBtn, setDisplayImgBtn] = useState(imgUrl ? false : true);
  const [tags, setTags] = useState(currentSighting.sighting_tags)
  const [removeTags, setRemoveTags] = useState([]);
  const [displayTagModal, setDisplayTagModal] = useState(false);

  useEffect(() => {
    if (imgFile !== "") setLoading(true);
    else return;
    const formData = new FormData();
    formData.append("image", imgFile);
    const res = async () => {
      const res = await fetch(`/api/sightings/image`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const image = await res.json();
        setImgUrl(image.url)
        setLoading(false);
      }
    }
    res();
  }, [imgFile])


  const editSighting = async (e) => {
    e.preventDefault()

    const removedTags = [];
    currentSighting.sighting_tags.forEach(tag => {
      if (!tags.includes(tag)) removeTags.push(tag);
    })
    setRemoveTags(removedTags);

    const payload = {
      sighting_id: sightingId,
      user_id: currentUser.id,
      title: title,
      description: description,
      image_url: imgUrl,
      tags: tags,
      removeTags: removeTags
    }
    if (!tags.length) return setErrors(["Please add at least one tag."])
    navigate(`/sightings/${sightingId}`);
    dispatch(sessionActions.updateSighting(payload));
  }

  return (
    <>
      <CreateNav />
      <form className="sighting-form">
        <ul>
          <button onClick={(e) => validateContent(e, title, description, setErrors, setDisplayTagModal)} className="form-submit-btn sighting-inputs">
            Update
          </button>

          {errors?.map((error, index) => <li className="error-mssg" key={index}>{error}</li>)}

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

<ReactQuill formats={formats} theme="snow" value={description} onChange={setDescription} />

          {/* <textarea
            id="form-description"
            className="sighting-inputs"
            placeholder="Tell your story...."
            type="text"
            value={description}
            onKeyDown={(e) => autosize(e)}
            onChange={(e) => setDescription(e.target.value)}
          /> */}
        </ul>
      </form>

      {displayTagModal ?
        <Tags errors={errors} currentUser={currentUser} tags={tags} setTags={setTags} setDisplayTagModal={setDisplayTagModal} submit={editSighting} />
        : null}
    </>
  )
}

export default EditForm;
