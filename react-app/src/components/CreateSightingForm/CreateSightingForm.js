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
  const [imageLoading, setImageLoading] = useState(false);


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
    setImageLoading(true);

    const res = await fetch(`/api/sightings/image`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      setImageLoading(false);
      console.log("IMAGE RES")
      // console.log(data.)
      setImageUrl(data.url)
      console.log(imageUrl)
      console.log("IMAGE URL ABOVE")
      // history.push("/mysightings");
    }
    else {
      setImageLoading(false);
      setImageLoading(false);
      const data = await res.json();
      // a real app would probably use more advanced
      // error handling
      // console.log(data);
    }
    // IMAGE UPLOAD ENDS









    const payload = {
      user_id: currentUser.id,
      title: title,
      description: description,
      category: category,
      url: imageUrl
    }

    console.log(payload)

    const data = await dispatch(sessionActions.createASighting(payload));
    if (data.errors) {
      setErrors(data.errors)
    } else {
      // history.push(`/upload`)
    }

  }



  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  return (
    <>
    <CreateNav />
      <form onSubmit={createSighting} className="sighting-form">
        <div className="form-inner">
          {errors?.map(error => (
            <p>{error.split(":")[1]}</p>
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


          <input
        id="file-btn"

          type="file"
          accept="image/*"
          onChange={updateImage}
        />



          <button className="post-form-btn sighting-inputs cursor">Post</button>
        </div>
      </form>
    </>
  )
}


export default CreateSightingForm;
