import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessions from "../../store/sighting"
import './Tags.css';

const Tags = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const categories = ["UFOs", "Angels", "Reincarnation", "Ghosts", "Monsters", "Mandela Effect", "Time Travel", "Demons", 'Synchronicity'];

  const search = async (e, searchStr) => {
    e.preventDefault();

    dispatch(sessions.searchAllSightings(searchStr))
    history.push(`/sightings/search/${searchStr}`)
  }

  return (
    <div id="tags-container">
      <h2 id="tags-header">DISCOVER MORE OF WHAT MATTERS TO YOU</h2>

      <ul id="categories-list">
        {categories.map(category => (
          <li
            onClick={(e) => search(e, category)}
          >{category}</li>
        ))}
      </ul>
    </div>
  )
}

export default Tags;
