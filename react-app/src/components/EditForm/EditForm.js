import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import CreateNav from "../CreateSightingForm/CreateNav";
import "../CreateSightingForm/CreateSightingForm.css"
import * as sessionActions from "../../store/sighting"


const EditForm = () => {
  const params = useParams()
  const { sightingId } = params
  let currentUser = useSelector(state => state.session.user)
  let sightings = useSelector(state => state.sightings)
  // let sightingsArray = Object.values(sightings)
  let currentSighting = sightings[sightingId]
  const history = useHistory()
  const dispatch = useDispatch()
  const [title, setTitle] = useState(window.localStorage.getItem("title"))
  const [description, setDescription] = useState(window.localStorage.getItem("description"))
  const [category, setCategory] = useState(window.localStorage.getItem("category"))
  const [imageUrl, setImageUrl] = useState(window.localStorage.getItem("image_url"))
  const [errors, setErrors] = useState([])
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // const [payload, setPayload] = useState({})



  const editSighting = async (e) => {
    e.preventDefault()

    // IMAGE UPLOAD STARTS
    const formData = new FormData();
    formData.append("image", image);

    // TODO
    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);

    const res = await fetch(`/api/sightings/image`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      setImageLoading(false);
      setImageUrl(data.url)



    }
    else {
      setImageLoading(false);
      const data = await res.json();
      // TODO
      // a real app would probably use more advanced
      // error handling
      console.log(data);
    }
    // IMAGE UPLOAD ENDS


    // console.log("PAYLOAD BELOW")
    // console.log(payload)
    // console.log(imageUrl)
    // const data = await dispatch(sessionActions.updateSighting(payload));
    // if (data.errors) {
    //   setErrors(data.errors)
    // } else {
    // history.push("/")
    // }


    let errorsArr = [];

    if (title?.length <= 4) errorsArr.push("Title must be at least 4 characters long.")
    if (description?.length <= 4) errorsArr.push("Description must be at least 5 characters long.")
    if (category?.length < 1) errorsArr.push("Please choose a category.")
    // if (imageUrl?.length < 1) errorsArr.push("Please upload an image.")
    setErrors(errorsArr)
    if (errorsArr.length === 0) {
      history.push('/mysightings')
    }

  }

  console.log(title)



  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  useEffect(() => {
    const payload = {
      sighting_id: sightingId,
      user_id: currentUser.id,
      title: title,
      description: description,
      category: category,
      url: imageUrl
    }
    dispatch(sessionActions.updateSighting(payload))
    // window.localStorage.setItem("currentSighting", currentSighting)


  }, [dispatch, imageUrl])


console.log("testing testing testing")
console.log(title)
console.log(window.localStorage.getItem("title"))

  useEffect(() => {
    (async () => {
      await dispatch(sessionActions.getAllSightings())
      setLoaded(true);
    })();
  }, [dispatch]);



  return (
    <>
      {loaded ?
        <>
          <CreateNav />
          <form onSubmit={editSighting} className="sighting-form edit-form">
            <div className="form-inner">
              {errors?.map(error => (
                <p>{error}</p>
              ))}
              <input
                className="sighting-inputs"
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
                type="text" value={title} placeholder="Title" />
              <textarea
                id="edit-textarea"
                className="sighting-inputs"
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
                type="text" value={description} placeholder="description" />
              <select
                className="sighting-inputs form-options"
                onChange={(e) => {
                  setCategory(e.target.value)
                }}
                value={category}>
                <option value="categories">Update Category?</option>
                <option value="UFOs">UFOs</option>
                <option value="Ghosts">Ghosts</option>
                <option value="Demons">Demons</option>
              </select>

              <label>
                Update Image?
              </label>
              <input
                id="file-btn"
                placeholder=""
                type="file"
                accept="image/*"
                onChange={updateImage}
              />

              <button className="post-form-btn sighting-inputs cursor">Update</button>
            </div>
          </form>
        </>
        : <h1>loading</h1>}
    </>
  )
}


export default EditForm;
