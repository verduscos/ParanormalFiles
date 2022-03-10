import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { VscGithub } from "react-icons/vsc"
import { BsLinkedin } from "react-icons/bs"
import * as sessions from "../../store/sighting"
import "./Categories.css";
import { useDispatch } from 'react-redux';

const Categories = () => {
  const [searchInput, setSearchInput] = useState("")
  const dispatch = useDispatch()
  const history = useHistory()
  const categories = ["UFOs", "Ghosts", "Demons", "Angels", "Reincarnation", "Monsters", "Mandela Effect", "Time Travel", 'Synchronicity'];

  // TODO post presentation
  const search = async (e, searchStr) => {
    e.preventDefault();
    dispatch(sessions.searchAllSightings(searchStr))
    history.push(`/sightings/search/${searchStr}`)
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
        }}
        onSubmit={
          (e) => {
            e.preventDefault()
            search(e, searchInput)
          }}
      >
        <input type="text" required />
        <button>search</button>
      </form>

      <h2 id="categories-header">Popular</h2>
      <div id="categories-inner">
        {categories.map(category => (
          <div
          key={category}
          id="testing"
          onClick={(e) => {
            search(e, category)
          }}
          ><p>{category}</p></div>
        ))}
      </div>


      <div id="aboutme-links">
        <p>Developed by Eddie Verdusco</p>
        <ul>
          <li key="github-link">
            <a href={"https://github.com/verduscos"} target="_blank" rel="noreferrer"><VscGithub /></a>
          </li>
          <li key="linkedin-link">
            <a href={"https://www.linkedin.com/in/eddie-verdusco/"} target="_blank" rel="noreferrer"><BsLinkedin /></a>
          </li>
        </ul>
      </div>

    </div>

  )
}


export default Categories;
