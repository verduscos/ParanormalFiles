import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { searchAllSightings } from "../../store/sighting";
import { AiOutlineSearch } from "react-icons/ai";
import "./Search.css";

const Search = () => {
  const navigate = useNavigate();
  const { string } = useParams();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (string !== undefined) dispatch(searchAllSightings(string));
  }, [dispatch, string])

  const search = async (e) => {
    e.preventDefault();
    navigate(`/sightings/search/${searchInput}`);
  }

  return (
    <form id="search-form" onSubmit={(e) => search(e)}>
      <AiOutlineSearch id="search-icon" />
      <input  id="search-input" type="text" onChange={(e) => setSearchInput(e.target.value)} required />
    </form>

  )
}

export default Search;
