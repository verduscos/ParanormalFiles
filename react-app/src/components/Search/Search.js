import React, { useState } from "react";
import {  useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
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
      <AiOutlineSearch id="search-icon" />
      <input  id="search-input" type="text" onChange={(e) => setSearchInput(e.target.value)} required />
    </form>

  )
}

export default Search;
