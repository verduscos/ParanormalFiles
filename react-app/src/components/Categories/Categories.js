import React from 'react';
import { Link } from "react-router-dom";
// import { UseState } from "react-redux";
import "./Categories.css";

const Categories = () => {
  // const [searchStr, setSearchStr] = useState("")
  const categories = ["UFOs", "Ghosts", "Demons", "Angels", "Reincarnation", "Monsters", "Mandela Effect", "Time Travel", 'Synchronicity'];

  // TODO post presentation
  // const search = async (e) => {
  //   e.preventDefault();

  //   const data = await fetch(`/api/sightings/search/${searchStr}`)
  //   console.log(data);
  //   console.log("DATA SHOULD BE ABOVE")
  // }

  return (
    <div id="categories-container">
      {/* <form onSubmit={search} id="search-form">
        <input onChange={((e) => {
          setSearchStr(e.target.value)
        })} id="search" type="text" placeholder='Search'/>
      </form> */}
      <div id="categories-inner">
        {categories.map(category => (
          <Link to={`/sightings/categories/${category}`} key={category}>{category}</Link>
        ))}
      </div>
    </div>

  )
}


export default Categories;
