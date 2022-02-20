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
  const [date, setDate] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [errors, setErrors] = useState([])


  useEffect(() => {
    dispatch(sessionActions.getAllSightings())
  }, [dispatch])


  const createSighting = async (e) => {
    e.preventDefault()

    const payload = {
      user_id: currentUser.id,
      date: date,
      location: "testing",
      title: title,
      description: description,
      category: category
    }

    const data = await dispatch(sessionActions.createASighting(payload));
    if (data) {
      console.log(data)
      setErrors(data)
      console.log("INSIDE DATA")
    }

    // dispatch(sessionActions.createASighting(payload)).catch(async (res) => {
    //   const data = await res.json();
    //   if (data.errors) {
    //     console.log("FRONT", data.errors)
    //     return setErrors([data.errors]);
      // }

    // })


    //history.push(`/upload`)
  }

  console.log(errors)
  return (
    <>
    <CreateNav />
      <form onSubmit={createSighting} id="sighting-form">
        <div id="form-inner">
          {errors.map(error => (
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
            id="form-options"
            className="sighting-inputs"
            onChange={(e) => {
              setCategory(e.target.value)
            }}
            value={category}>
            <option value="categories">Select Category</option>
            <option value="UFOs">UFOs</option>
            <option value="Ghosts">Ghosts</option>
            <option value="Demons">Demons</option>
            <option value="Demons">Angels</option>
            <option value="Demons">Reincarnation</option>
            <option value="Demons">Monsters</option>
            <option value="Demons">Mandela Effect</option>
            <option value="Demons">Time Travel</option>
            <option value="Demons">Synchronicity</option>
          </select>
          <button id="post-form-btn" className="sighting-inputs cursor">Post</button>
        </div>
      </form>
    </>
  )
}


export default CreateSightingForm;
