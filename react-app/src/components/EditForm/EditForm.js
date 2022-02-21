import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import CreateNav from "../CreateSightingForm/CreateNav";
import "../CreateSightingForm/CreateSightingForm.css"

import * as sessionActions from "../../store/sighting"


const EditForm = () => {
  let currentUser = useSelector(state => state.session.user)
  const params = useParams()
  const { sightingId } = params
  const history = useHistory()
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [errors, setErrors] = useState([])


  const editSighting = async (e) => {
    e.preventDefault()

    const payload = {
      user_id: currentUser.id,
      date: "",
      location: "testing",
      title: title,
      description: description,
      category: category,
      sighting_id: sightingId
    }

    const data = await dispatch(sessionActions.updateSighting(payload));
    if (data.errors) {
      setErrors(data.errors)
    } else {
      history.push("/")
    }
  }

  return (
    <>
      <CreateNav />
      <form onSubmit={editSighting} className="sighting-form">
        <div className="form-inner">
        {errors?.map(error => (
            <p>{error.split(":")[1]}</p>
          ))}
          <input
            className="sighting-inputs"
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            type="text" value={title} placeholder="Title" />
          <textarea
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
            <option value="categories">Select Category</option>
            <option value="UFOs">UFOs</option>
            <option value="Ghosts">Ghosts</option>
            <option value="Demons">Demons</option>
          </select>
          <button className="post-form-btn sighting-inputs cursor">Update</button>
        </div>
      </form>
    </>
  )
}


export default EditForm;
