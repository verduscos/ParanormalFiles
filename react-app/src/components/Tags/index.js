import React from 'react';
import { useNavigate } from "react-router-dom";
import './Tags.css';

const Tags = () => {
  const navigate = useNavigate();
  const tagList = ["UFOs", "Angels", "Reincarnation", "Ghosts", "Monsters", "Demons", 'Synchronicity'];

  const search = async (e, searchStr) => {
    e.preventDefault();
    navigate(`/sightings/search/${searchStr}`);
  }

  return (
    <div id="tags-container">
      <div id="tags-wrapper">
        <h2 id="tags-header">DISCOVER MORE OF WHAT MATTERS TO YOU</h2>
        <ul id="categories-list">
          {tagList.map((tag, index) => (
            <li
              key={index}
              className="categories-list-item"
              onClick={(e) => search(e, tag)}
            >{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Tags;
