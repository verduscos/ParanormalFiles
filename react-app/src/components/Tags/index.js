import React from 'react';
import './Tags.css';

const Tags = () => {
  const categories = ["UFOs", "Ghosts", "Demons", "Angels", "Reincarnation", "Monsters", "Mandela Effect", "Time Travel", 'Synchronicity'];


  return (
    <div id="tags-container">
      <h2 id="tags-header">DISCOVER MORE OF WHAT MATTERS TO YOU</h2>

      <ul id="categories-list">
        {categories.map( category => (
          <li>{category}</li>
        ))}
      </ul>
    </div>
  )
}

export default Tags;
