import React from 'react';
import { Link } from "react-router-dom";
import "./Categories.css";

const Categories = () => {
  const categories = ["Ufos", "Ghosts", "Demons", "Angels", "Reincarnation", "Monsters", "Mandel Effect", "Time Travel", 'Synchronicity'];

  return (
    <div id="categories-container">
      <h1 id="test">Categories</h1>
      {categories.map(category => (
        <Link to={`/sightings/${category}`}>{category}</Link>
      ))}
    </div>

  )
}


export default Categories;
