import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from 'react-router-dom'
import * as sessionActions from "../../store/sighting"
import "./sightings.css"

const Sightings = () => {
  const dispatch = useDispatch()
  let currentUser = useSelector(state => state.session.user)
  let sightings = useSelector(state => state.sightings);
  let sightingsArray = Object.values(sightings);
  // const all = dispatch(sessionActions.getAllSightings());
  // const [thunk, setThunk] = "all";


  const location = useLocation();
  let path = location.pathname;
  console.log(location.pathname, "lkjdklasjfalsdkfjaklsdfj");

  // const [thunk, setThunk] = useState(dispatch(sessionActions.getAllSightings()));



  useEffect(() => {
    if (path === '/') {
      dispatch(sessionActions.getAllSightings());
    } else if (path === "/favorites") {
      dispatch(sessionActions.getAllFavorites(currentUser.id));
    } else {
      dispatch(sessionActions.getAllUserSightings());
    }
  }, [path])


  return (
    <div id="sightings-container">
      {!sightingsArray.length ?
        <>
          <h2>No results found.</h2>
        </>
        : null}

      {sightingsArray.map((sighting, i) => (
        <div id="sighting-card">
          <ul id="sighting-details" key={sighting?.id}>
            <li key={`date-${sighting?.id}`}>
              <h4 id="sighting-author">
                {sighting?.username}
              </h4>
            </li>
            <li>
              <Link className="link" to={`/sightings/${sighting?.id}`} key={`link-${i}`}>
                <div key={`title-${sighting?.id}`}>
                  <h2 id="sighting-title">{sighting.title}</h2>
                  <p className="sighting-story">{sighting.description}</p>
                </div>
              </Link>
            </li>
            <li id="sighting-tag-container">
              <span id="sighting-date">{`${sighting?.created_at.split(' ')[2]} ${sighting.created_at.split(' ')[1]}`}</span>
              {/* , ${sighting.created_at.split(' ')[3]} */}

              <Link className="link tag" to={`/sightings/categories/${sighting?.category}`}>
                <p className="category-link" key={`category-${sighting?.id}`} >{sighting?.category}</p>
              </Link>
            </li>
          </ul>
          <Link className="link" to={`/sightings/${sighting?.id}`} key={`link-${i}-img`}>
            <img className="sighting-img" src={sighting?.image_url} alt="sighting-img"></img>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Sightings;
