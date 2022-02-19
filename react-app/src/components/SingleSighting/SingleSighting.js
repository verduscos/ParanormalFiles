import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import * as sessionActions from "../../store/sighting"
import Comments from "../Comments/Comments"
import { getALLComments } from "../../store/comment";
import "./SingleSighting.css"


const SingleSighting = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const { sightingId } = params
  let sighting = useSelector(state => state.sightings[sightingId])
  let currentUser = useSelector(state => state.session.user)


  useEffect(() => {
    dispatch(getALLComments(sightingId))
  }, [dispatch, sightingId])


  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(sessionActions.deleteASighting(sightingId))

    history.push("/")
  }


  useEffect(() => {
    dispatch(sessionActions.getAllSightings())
  }, [dispatch])

  return (
    <div id="sighting-comp-container">
      <div id="article-container">

        {currentUser && currentUser?.id === sighting?.user_id ?
          <button onClick={handleDelete}>Delete</button> :
          null
        }
        {currentUser && currentUser?.id === sighting?.user_id ?
          <Link to={`/sightings/edit/${sighting.id}`}>Edit</Link> :
          null
        }

        {/* <p>{sighting?.date}</p> */}
        {/* <p>{sighting?.category}</p> */}
        <h1 id="article-title">{sighting?.title}</h1>
        <img src={sighting?.sighting_images[0]} id="sighting-img"></img>
        <p id="article-body">{sighting?.description}</p>

        <Comments />
      </div>
    </div>
  )
}


export default SingleSighting;
