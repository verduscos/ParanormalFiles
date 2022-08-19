import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import CreateNav from "../CreateSightingForm/CreateNav";
import "../CreateSightingForm/CreateSightingForm.css"
import * as sessionActions from "../../store/sighting"


const EditForm = () => {
  const params = useParams()
  const { sightingId } = params
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let currentUser = useSelector(state => state.session.user)
  const currentSighting = JSON.parse(window.localStorage.getItem("currentSighting"));;
  const [title, setTitle] = useState(currentSighting.title);
  const [description, setDescription] = useState(currentSighting.description);
  const [category, setCategory] = useState(currentSighting.category);
  const [imageUrl, setImageUrl] = useState(currentSighting.imageUrl);
  const [errors, setErrors] = useState([])
  const [image, setImage] = useState(null);
  const [editTextOnly, setEditTextOnly] = useState(true)
  const [displayUrl, setDisplayUrl] = useState("")


  console.log("inside editFORM", currentSighting);



  const editSighting = async (e) => {
    e.preventDefault()


    // IMAGE UPLOAD STARTS
    const formData = new FormData();
    formData.append("image", image);

    // TODO
    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea

    const res = await fetch(`/api/sightings/image`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      setImageUrl(data.url)



    }
    else {
      // TODO
      // a real app would probably use more advanced
      // error handling
    }
    // IMAGE UPLOAD ENDS



    let errorsArr = [];

    if (title?.length <= 4) errorsArr.push("Title must be at least 4 characters long.")
    if (description?.length <= 4) errorsArr.push("Description must be at least 5 characters long.")
    if (category?.length < 1) errorsArr.push("Please choose a category.")
    setErrors(errorsArr)
    if (errorsArr.length === 0) {
      navigate(`/sightings/${sightingId}`);
    }

  }


  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setEditTextOnly(false)
    setDisplayUrl(file["name"])
  }

  useEffect(() => {
    const payload = {
      sighting_id: sightingId,
      user_id: currentUser.id,
      title: title,
      description: description,
      category: category,
      image_url: imageUrl
    }
    dispatch(sessionActions.updateSighting(payload))

  }, [imageUrl, dispatch])

  const editText = (e) => {
    e.preventDefault()

    const payload = {
      sighting_id: sightingId,
      user_id: currentUser.id,
      title: title,
      description: description,
      category: category,
      image_url: imageUrl
    }
    let errorsArr = [];

    if (title?.length <= 4) errorsArr.push("Title must be at least 4 characters long.")
    if (description?.length <= 4) errorsArr.push("Description must be at least 5 characters long.")
    if (category?.length < 1) errorsArr.push("Please choose a category.")
    // if (imageUrl?.length < 1) errorsArr.push("Please upload an image.")
    setErrors(errorsArr)
    if (errorsArr.length === 0) {
      dispatch(sessionActions.updateSighting(payload))
      navigate(`/sightings/${sightingId}`);
    }
  }

  const submitBtn = (
    <>
      {editTextOnly ? null
        :
        <button onClick={editSighting} className="form-submit-btn sighting-inputs">Upload</button>
      }


      {editTextOnly ?
        <button onClick={editText} className="form-submit-btn sighting-inputs">Update</button>
        : null}
    </>
  )



  return (
    <>


      <CreateNav />
      <form className="sighting-form">
        <div>
          {submitBtn}

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
            type="text" value={description} placeholder="description" />

          <div className="form-category-image-container">
            <select
              className="form-select-options sighting-inputs"
              onChange={(e) => {
                setCategory(e.target.value)
              }}
              value={category}>
              <option value="categories">Update Category?</option>
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

          {/* <input
                // onClick={() => {
                //   setEditTextOnly(false)
                // }}
                // value={test}
                // onChange={(e) => {
                //   setTest(e.target.value)
                // }}
                id="file-btn"
                type="file"
                accept="image/*"
                onChange={updateImage}
              /> */}


        </div>
      </form>
    </>
  )
}


export default EditForm;
