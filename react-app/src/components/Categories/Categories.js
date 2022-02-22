import React from 'react';
import { Link } from "react-router-dom";
import "./Categories.css";

const Categories = () => {
  const categories = ["UFOs", "Ghosts", "Demons", "Angels", "Reincarnation", "Monsters", "Mandela Effect", "Time Travel", 'Synchronicity'];

  return (
    <div id="categories-container">
      <h1 id="test">Categories</h1>
      {categories.map(category => (
        <Link to={`/sightings/categories/${category}`}>{category}</Link>
      ))}
    </div>

  )
}


export default Categories;
