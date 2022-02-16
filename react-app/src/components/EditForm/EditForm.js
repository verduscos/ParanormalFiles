import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import * as sessionActions from "../../store/sighting"
import CreateForm from "../CreateForm/CreateForm";


const EditForm = () => {
  let currentUser = useSelector(state => state.session.user)
  const params = useParams()
  const { sightingId } = params
  const history = useHistory()
  const dispatch = useDispatch()
  const [date, setDate] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")

  const editSighting = (e) => {
    e.preventDefault()

    const payload = {
      user_id: currentUser.id,
      date: date,
      location: "testing",
      title: title,
      description: description,
      category: category,
      sighting_id: sightingId
    }

    dispatch(sessionActions.updateSighting(payload))
    history.push("/")
  }

  return (
    <>
      <h1>EDIT FORM</h1>
      <form onSubmit={editSighting} id="sighting-form">
        <input
          onChange={(e) => {
            setDate(e.target.value)
          }}
          type="date" value={date} />
        <input
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          type="text" value={title} placeholder="Title" />
        <textarea
          onChange={(e) => {
            setDescription(e.target.value)
          }}
          type="text" value={description} placeholder="description" />
        <select
          onChange={(e) => {
            setCategory(e.target.value)
          }}
          value={category}>
          <option value="categories">Select Category</option>
          <option value="UFOs">UFOs</option>
          <option value="Ghosts">Ghosts</option>
          <option value="Demons">Demons</option>
        </select>
        <button>Report</button>
      </form>    </>
  )
}


export default EditForm;
