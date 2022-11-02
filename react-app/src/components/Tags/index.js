import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessions from "../../store/sighting"
import './Tags.css';

const Tags = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tagList = ["UFOs", "Angels", "Reincarnation", "Ghosts", "Monsters", "Mandela Effect", "Time Travel", "Demons", 'Synchronicity'];

  const search = async (e, searchStr) => {
    e.preventDefault();

    dispatch(sessions.searchAllSightings(searchStr));
    navigate(`/sightings/search/${searchStr}`);
  }

  return (
    <div id="tags-container">
      <div id="tags-wrapper">
        <h2 id="tags-header">DISCOVER MORE OF WHAT MATTERS TO YOU</h2>
        <ul id="categories-list">
          {tagList.map(tag => (
            <li
              onClick={(e) => search(e, tag)}
              className="categories-list-item"
              key={tag}
            >{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Tags;
