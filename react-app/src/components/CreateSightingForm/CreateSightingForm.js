import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/sighting"
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


  const createSighting = (e) => {
    e.preventDefault()

    const payload = {
      user_id: currentUser.id,
      date: date,
      location: "testing",
      title: title,
      description: description,
      category: category
    }

    dispatch(sessionActions.createASighting(payload)).catch(async (res) => {
      console.log("INSIDE DISPATCH")
      const data = await res.json();
      if (data.errors) {
        console.log("FRONT", data.errors)
        return setErrors(["askdfjlk"]);
      }

    })


    //history.push(`/upload`)
  }

  console.log(errors)
  return (
    <form onSubmit={createSighting} id="sighting-form">
      <div id="form-inner">

        <input className="sighting-inputs"

          onChange={(e) => {
            setDate(e.target.value)
          }}
          type="date" value={date} />
        <input className="sighting-inputs"
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          type="text" value={title} placeholder="Title" />
        <textarea
          id="textarea"
          className="sighting-inputs"
          onChange={(e) => {
            setDescription(e.target.value)
          }}
          type="text" value={description} placeholder="Describe your sighting..." />
        <select
          className="sighting-inputs"
          onChange={(e) => {
            setCategory(e.target.value)
          }}
          value={category}>
          <option value="categories">Select Category</option>
          <option value="UFOs">UFOs</option>
          <option value="Ghosts">Ghosts</option>
          <option value="Demons">Demons</option>
        </select>
        <button className="sighting-inputs cursor">Report</button>
      </div>
    </form>
  )
}


export default CreateSightingForm;
