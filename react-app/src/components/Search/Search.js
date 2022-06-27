import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineSearch } from "react-icons/ai"
import * as sessions from "../../store/sighting"
import "./Search.css"

const Search = () => {
  const params = useParams();

  const history = useHistory();
  const [searchInput, setSearchInput] = useState("")

  const { string } = params;
  const dispatch = useDispatch();
  let sightings = useSelector(state => state.sightings);
  let sightingsArray = Object.values(sightings);

  const search = async (e, searchStr) => {
    e.preventDefault();

    console.log("INSIDE search function", searchInput)
    dispatch(sessions.searchAllSightings(searchInput))
    history.push(`/sightings/search/${searchInput}`)
  }

  // useEffect(() => {
  //   dispatch(sessions.searchAllSightings(string))

  // }, [dispatch])

  return (
    <>
      <h1>
        Search
      </h1>
      <form
        id="search-form"
        // value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value)
        }}
        onSubmit={
          (e) => {
            e.preventDefault()
            search(e, searchInput)
          }}
      >
        {/* <AiOutlineSearch id="search-icon" /> */}
        <button>search</button>
      </form>
      <input id="search" type="text"         onChange={(e) => {
          setSearchInput(e.target.value)
        }} required />
    </>
    // <div id="sightings-container">
    //   <div id="sightings-inner">

    //     <h1 className="search-headers">Search Results for: {string}</h1>
    //     {sightingsArray.length ?
    //     <>
    //       {
    //         sightingsArray.map((sighting, i) => (
    //           <ul id="sighting-card" key={sighting?.id}>
    //             <div>
    //               <li className="card-r1" key={`date-${sighting?.id}`}>
    //                 <p>{sighting?.username}</p>
    //                 <p>{sighting?.date}</p>
    //               </li>
    //               <Link className="link" to={`/sightings/${sighting?.id}`} key={`link-${i}`}>
    //                 <div key={`title-${sighting?.id}`}>
    //                   <h2 className="card-text">{sighting.title}</h2>
    //                   <p className="card-text card-story">{sighting.description}</p>
    //                 </div>
    //               </Link>


    //               <div id="sighting-date">
    //                 <p>{`${sighting?.created_at.split(' ')[2]} ${sighting.created_at.split(' ')[1]}, ${sighting.created_at.split(' ')[3]} in `}</p>
    //                 <Link className="link" to={`/sightings/categories/${sighting?.category}`}>
    //                   <li className="category-link" key={`category-${sighting?.id}`} >{sighting?.category}</li>
    //                 </Link>
    //               </div>

    //             </div>
    //             <Link className="link card-img" to={`/sightings/${sighting?.id}`} key={`link-${i}-img`}>
    //               <img className="card-img" src={sighting?.image_url} alt="sighting-img"></img>
    //             </Link>
    //           </ul>
    //         ))
    //       }

    //         </>


    //       : <h3 className="search-headers">Sorry, but nothing matched your search terms.</h3>}
    //   </div>
    // </div>
  )
}

export default Search;
