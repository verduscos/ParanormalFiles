import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/sighting"

const CreateForm = () => {
  let currentUser = useSelector(state => state.session.user)
  const history = useHistory()
  const dispatch = useDispatch()
  const [date, setDate] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")

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

    dispatch(sessionActions.createASighting(payload))
    history.push("/")
  }


  return (
    <>
      <form onSubmit={createSighting} id="sighting-form">
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
      </form>
    </>
  )
}


export default CreateForm;
