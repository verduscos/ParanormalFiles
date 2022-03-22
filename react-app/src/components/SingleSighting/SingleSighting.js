import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import * as sessionActions from "../../store/sighting"
import { deleteLike, likeSightingThunk } from "../../store/like";
import Comments from "../Comments/Comments"
import { getSightingLikes } from "../../store/like";
import { getALLComments } from "../../store/comment";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineLike, AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import "./SingleSighting.css"


const SingleSighting = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const { sightingId } = params
  const [userBtns, setUserBtns] = useState(false)
  const [favorited, setFavorited] = useState(false)
  const [displayRemove, setDisplayRemove] = useState(true)
  let sighting = useSelector(state => state.sightings[sightingId])
  let currentUser = useSelector(state => state.session.user)
  let likes = useSelector(state => state.likes)
  console.log(likes[sightingId])

  useEffect(() => {
    dispatch(sessionActions.getAllSightings())

  }, [dispatch])



  window.localStorage.setItem("title", sighting?.title)
  window.localStorage.setItem("description", sighting?.description)
  window.localStorage.setItem("category", sighting?.category)
  window.localStorage.setItem("image_url", sighting?.image_url)



  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(sessionActions.deleteASighting(sightingId))

    history.push("/mysightings")
  }

  const favorite = (e) => {
    e.preventDefault();

    const payload = {
      user_id: currentUser.id,
      sighting_id: sightingId
    }

    dispatch(likeSightingThunk(payload))
    localStorage.setItem(sighting.id, true)
    setFavorited(true)

  }


  const unfavorite = (e) => {
    e.preventDefault();

    const payload = {
      user_id: currentUser.id,
      sighting_id: sightingId
    }

    dispatch(deleteLike(payload))
    localStorage.removeItem(sighting.id)
    setDisplayRemove(false)
  }

  // let userBtns = (
  //   <div>
  //     <button onClick={handleDelete}>Delete</button>
  //     <Link to={`/sightings/edit/${sighting.id}`}>Edit</Link>
  //   </div>
  // )


  useEffect(() => {
    dispatch(sessionActions.getAllSightings());
    dispatch(getSightingLikes(currentUser.id));

  }, [dispatch])

  useEffect(() => {
    dispatch(getALLComments(sightingId))
    // dispatch(getSightingLikes(sightingId))
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

          <div id="temp-container">

        { likes[sightingId]  ?
                <div onClick={(e) => {
                  unfavorite(e)
                }}
                className="like-btns red"
                ><AiFillHeart /></div>
          :
          <div onClick={(e) => {
            favorite(e)
          }}
          className="like-btns"
          ><AiOutlineHeart /></div>
        }


        <p id="sighting-date-article">{`${sighting?.created_at.split(' ')[2]} ${sighting?.created_at.split(' ')[1]}, ${sighting?.created_at.split(' ')[3]}`}</p>
        </div>
        <img src={sighting?.image_url} id="sighting-img" alt="article-img"></img>
        <p id="article-body">{sighting?.description.replace(/\n+/g, '\n\n')}</p>
        <Comments />
      </div>

      {/* LIKES */}
      {/* <div>
          <AiOutlineLike />

      </div> */}


    </div>
  )
}


export default SingleSighting;
