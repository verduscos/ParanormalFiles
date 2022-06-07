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


  const tagList = ["UFOs", "Angels", "Reincarnation", "Ghosts", "Monsters", "Mandela Effect", "Time Travel", "Demons", 'Synchronicity'];

  const search = async (e, searchStr) => {
    e.preventDefault();

    dispatch(sessions.searchAllSightings(searchStr))
    history.push(`/sightings/search/${searchStr}`)

    // sightingsArray = sightingsArray.filter(s => s.category === searchStr);
    // need to filter correctly, save a query
    // console.log(sightingsArray);
  }

  return (
    <div id="content-grid">
      <div id="main">
ONE
      </div>

      <div id="main2">
TWO
      </div>

      <div id="tags-container">
        <h2 id="tags-header">DISCOVER MORE OF WHAT MATTERS TO YOU</h2>

        <ul id="categories-list">
          {tagList.map(tag => (
            <li
              onClick={(e) => search(e, tag)}
            >{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Tags;
