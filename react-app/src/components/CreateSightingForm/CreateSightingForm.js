import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/sighting"
import CreateNav from "./CreateNav";
import "./CreateSightingForm.css"

const CreateSightingForm = () => {
  let currentUser = useSelector(state => state.session.user)
  const history = useHistory()
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [errors, setErrors] = useState([])
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("")
  const [displayUrl, setDisplayUrl] = useState("")


  useEffect(() => {
    dispatch(sessionActions.getAllSightings())
  }, [dispatch])


  const createSighting = async (e) => {
    e.preventDefault()

    // IMAGE UPLOAD STARTS
    const formData = new FormData();
    formData.append("image", image);

    // TODO
    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    // setImageLoading(true);

    const res = await fetch(`/api/sightings/image`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();

      setImageUrl(data.url)

      // history.push("/mysightings");
    }
    else {
      // setImageLoading(false);
      // setImageLoading(false);
      // const data = await res.json();
      // a real app would probably use more advanced
      // error handling
    }
    // IMAGE UPLOAD ENDS




    // const data = await dispatch(sessionActions.createASighting(payload));
    let errorsArr = [];

    if (title.length <= 4) errorsArr.push("Title must be at least 4 characters long.")
    if (description.length <= 4) errorsArr.push("Description must be at least 4 characters long.")
    if (category.length < 1) errorsArr.push("Please choose a category.")
    if (displayUrl.length < 1) errorsArr.push("Please choose an image.")
    setErrors(errorsArr)

    if (errorsArr.length === 0) {
      history.push('/mysightings')
    }


  }



  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setDisplayUrl(file["name"])
  }


  useEffect(() => {
    const payload = {
      user_id: currentUser.id,
      title: title,
      description: description,
      category: category,
      url: imageUrl
    }
    dispatch(sessionActions.createASighting(payload));

  }, [dispatch, imageUrl])

  return (
    <>
      <CreateNav />
      <form onSubmit={createSighting} className="sighting-form">
        <div className="form-inner">
          {errors?.map(error => (
            <li className="error-mssg">{error}</li>
          ))}

          {/* <input className="sighting-inputs"

          onChange={(e) => {
            setDate(e.target.value)
          }}
        type="date" value={date} /> */}
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
          <select
            className="sighting-inputs form-options"
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

          <div className="upload-container">
            <label for="file-btn" value="Upload Image" id="file-label">
              <p>Choose Image</p>
            </label>
            <input
              id="file-btn"
              name="file"
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            <p>{displayUrl}</p>
          </div>



          <button className="post-form-btn sighting-inputs cursor">Post</button>
        </div>
      </form>
    </>
  )
}


export default CreateSightingForm;
