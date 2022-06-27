import React, { useState } from "react";
import {  useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineSearch } from "react-icons/ai"
import * as sessions from "../../store/sighting"
import "./Search.css"

const Search = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("")

  const search = async (e) => {
    e.preventDefault();

    dispatch(sessions.searchAllSightings(searchInput))
    history.push(`/sightings/search/${searchInput}`)
  }

  return (
    <form id="search-form" onSubmit={(e) => search(e)}>
      <h1>
        Search
      </h1>
      <AiOutlineSearch id="search-icon" />
      <input  type="text" onChange={(e) => {
        setSearchInput(e.target.value)
      }} required />
      <button>search</button>
    </form>

  )
}

export default Search;
