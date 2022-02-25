import React from 'react';
import { Link } from "react-router-dom";
// import { UseState } from "react-redux";
import { VscGithub } from "react-icons/vsc"
import { BsLinkedin } from "react-icons/bs"
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

      <div id="categories-inner">
        <div id="ufos">
          <Link to={`/sightings/categories/UFOs`}>UFOs</Link>
        </div>
        <div id="ghosts">
          <Link to={`/sightings/categories/Ghosts`}>Ghosts</Link>
        </div>
        <div id="demons">
          <Link to={`/sightings/categories/Demons`}>Demons</Link>
        </div>
        <div>
          <Link to={`/sightings/categories/Angels`} id="angels">Angels</Link>
        </div>
        <div>
          <Link to={`/sightings/categories/Reincarnation`} id="reincarnation">Reincarnation</Link>
        </div>
        <div>
          <Link to={`/sightings/categories/Monsters`} id="monsters">Monsters</Link>
        </div>
        <div>
          <Link to={`/sightings/categories/Mandela Effect`} id="mandela-effect">Mandela Effect</Link>
        </div>
        <div>
          <Link to={`/sightings/categories/Time Travel`} id="time-travel">Time Travel</Link>
        </div>
        <div>
          <Link to={`/sightings/categories/Synchronicity`} id="synchronicity">Synchronicity</Link>
        </div>
      </div>


      <div id="aboutme-links">
        <p>Developed by Eddie Verdusco</p>
        <ul>
          <li key="github-link">
            <a href={"https://github.com/verduscos"} target="_blank"><VscGithub /></a>
          </li>
          <li key="github-link">
            <a href={"https://www.linkedin.com/in/eddie-verdusco/"} target="_blank"><BsLinkedin /></a>
          </li>
        </ul>
      </div>

    </div>

  )
}


export default Categories;
