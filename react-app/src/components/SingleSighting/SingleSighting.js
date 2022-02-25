import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import * as sessionActions from "../../store/sighting"
import Comments from "../Comments/Comments"
import { getALLComments } from "../../store/comment";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import "./SingleSighting.css"


const SingleSighting = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const { sightingId } = params
  const [userBtns, setUserBtns] = useState(false)
  let sighting = useSelector(state => state.sightings[sightingId])
  let currentUser = useSelector(state => state.session.user)

  window.localStorage.setItem("title", sighting?.title)
  window.localStorage.setItem("description", sighting?.description)
  window.localStorage.setItem("category", sighting?.category)
  window.localStorage.setItem("image_url", sighting?.image_url)



  useEffect(() => {
    dispatch(getALLComments(sightingId))
  }, [dispatch, sightingId])


  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(sessionActions.deleteASighting(sightingId))

    history.push("/")
  }

  // let userBtns = (
  //   <div>
  //     <button onClick={handleDelete}>Delete</button>
  //     <Link to={`/sightings/edit/${sighting.id}`}>Edit</Link>
  //   </div>
  // )


  useEffect(() => {
    dispatch(sessionActions.getAllSightings())
  }, [dispatch])

  useEffect(() => {
    dispatch(getALLComments(sightingId))
  }, [dispatch, sightingId])

  return (
    <div id="sighting-comp-container">
      <div id="article-container">

        {/* <p>{sighting?.date}</p> */}
        {/* <p>{sighting?.category}</p> */}

        <div id="header-container">
          <h1 id="article-title">{sighting?.title}</h1>

          {currentUser && currentUser?.id === sighting?.user_id ?
            <>
              <span
              onBlur={() => {
                setUserBtns(!userBtns)
              }}
              onClick={() => {
                setUserBtns(!userBtns)
              }}>

                <BiDotsHorizontalRounded size={25} />
              </span>

            </>
            :
            null
          }
        </div>

        {userBtns ?
                <div id="user-btns">
                  <button onClick={handleDelete}>Delete</button>
                  <Link to={`/sightings/edit/${sighting.id}`}>Edit</Link>
                </div>
                : null}
        <p id="sighting-date">{`${sighting?.created_at.split(' ')[2]} ${sighting?.created_at.split(' ')[1]}, ${sighting?.created_at.split(' ')[3]}`}</p>
        <img src={sighting?.image_url} id="sighting-img" alt="article-img"></img>
        <p id="article-body">{sighting?.description.replace(/\n+/g, '\n\n')}</p>
        <Comments />
      </div>
    </div>
  )
}


export default SingleSighting;
