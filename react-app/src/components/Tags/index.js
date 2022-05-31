import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as sessions from "../../store/sighting"
import './Tags.css';

const Tags = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let sightings = useSelector(state => state.sightings);
  let sightingsArray = Object.values(sightings);

  console.log(sightings);

  const categories = ["UFOs", "Angels", "Reincarnation", "Ghosts", "Monsters", "Mandela Effect", "Time Travel", "Demons", 'Synchronicity'];

  const search = async (e, searchStr) => {
    e.preventDefault();
    console.log(sightingsArray);

    sightingsArray = sightingsArray.filter(s => s.category === searchStr);
    console.log(sightingsArray);
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
