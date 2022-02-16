import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import * as sessionActions from "../../store/sighting"
import "./sightings.css"

const Sightings = () => {
  const dispatch = useDispatch()
  let sightings = useSelector(state => state.sightings);
  let sightingsArray = Object.values(sightings);
  console.log("THIS IS THE ARRAY")
  console.log(sightingsArray)

  const [date, setDate] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")

  const createSighting = (e) => {
    e.preventDefault()

    const payload = {
      // TODO
      // replace user id
      user_id: "1",
      date: date,
      location: "testing",
      title: title,
      description: description,
      category: category
    }

    dispatch(sessionActions.createASighting(payload))
  }


  useEffect(() => {
    dispatch(sessionActions.getAllSightings())
  }, [dispatch])


  return (
    <>
      <h1>Hello, World!</h1>
      {sightingsArray.map((sighting, i) => (
        <Link to={`/sightings/${sighting?.id}`}  key={`link-${i}`}>
          <ul id="sighting-card" key={sighting?.id}>
            {/* <li key={sighting.id}>{sighting.location}</li> */}
            <li key={`date-${sighting?.id}`}>{sighting?.date}</li>
            <li key={`title-${sighting?.id}`}>{sighting?.title}</li>
            {/* <li key={`description-${sighting.id}`}>{sighting.description}</li> */}
            <li key={`category-${sighting?.id}`}>{sighting?.category}</li>
          </ul>
        </Link>
      ))}

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

export default Sightings;
