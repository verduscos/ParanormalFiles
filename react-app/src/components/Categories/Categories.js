import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { VscGithub } from "react-icons/vsc"
import { BsLinkedin } from "react-icons/bs"
import * as sessions from "../../store/sighting"
import "./Categories.css";
import { useDispatch } from 'react-redux';

const Categories = () => {
  const [searchInput, setSearchInput] = useState("")
  const dispatch = useDispatch()
  const categories = ["UFOs", "Ghosts", "Demons", "Angels", "Reincarnation", "Monsters", "Mandela Effect", "Time Travel", 'Synchronicity'];

  // TODO post presentation
  const search = async (e, searchStr) => {
    e.preventDefault();
    dispatch(sessions.searchAllSightings())
    // const data = await fetch(`/api/sightings/search/${searchStr}`)
    // console.log(data);
    // console.log("DATA SHOULD BE ABOVE")
  }

  useEffect(() => {
    dispatch(sessions.searchAllSightings())
  }, [dispatch])

  return (
    <div id="categories-container">

      <form
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value)
          console.log(searchInput)
        }}
        onSubmit={
          (e) => {
            e.preventDefault()
            console.log("INPUT", searchInput)
            search(e, searchInput)
          }}
      >
        <input type="text" required />
        <button>search</button>
      </form>

      <h2 id="categories-header">Categories</h2>
      <div id="categories-inner">
        <div id="ufos">
          <Link to={`/sightings/categories/UFOs`}>UFOs</Link>
        </div>
        <div id="ghosts">
          <Link to={`/sightings/categories/Ghosts`}>Ghosts</Link>
        </div>
        <div id="demons">
          <Link to={`/sightings/categories/Demons`}>Demons</Link>
        </div>
        <div>
          <Link to={`/sightings/categories/Angels`} id="angels">Angels</Link>
        </div>
        <div>
          <Link to={`/sightings/categories/Reincarnation`} id="reincarnation">Reincarnation</Link>
        </div>
        <div>
          <Link to={`/sightings/categories/Monsters`} id="monsters">Monsters</Link>
        </div>
        <div>
          <Link to={`/sightings/categories/Mandela Effect`} id="mandela-effect">Mandela Effect</Link>
        </div>
        <div>
          <Link to={`/sightings/categories/Time Travel`} id="time-travel">Time Travel</Link>
        </div>
        <div>
          <Link to={`/sightings/categories/Synchronicity`} id="synchronicity">Synchronicity</Link>
        </div>
      </div>


      <div id="aboutme-links">
        <p>Developed by Eddie Verdusco</p>
        <ul>
          <li key="github-link">
            <a href={"https://github.com/verduscos"} target="_blank"><VscGithub /></a>
          </li>
          <li key="linkedin-link">
            <a href={"https://www.linkedin.com/in/eddie-verdusco/"} target="_blank"><BsLinkedin /></a>
          </li>
        </ul>
      </div>

    </div>

  )
}


export default Categories;
