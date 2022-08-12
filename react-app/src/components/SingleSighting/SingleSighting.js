import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as sessionActions from "../../store/sighting"
import { deleteLike, likeSightingThunk } from "../../store/like";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import "./SingleSighting.css"
import Comments from "../Comments/Comments";


const SingleSighting = ( { test } ) => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const params = useParams()
  const { sightingId } = params
  const [userBtns, setUserBtns] = useState(false)
  let sighting = useSelector(state => state.sightings[sightingId])
  let currentUser = useSelector(state => state.session.user)
  let likes = useSelector(state => state.likes)

  console.log("I AM HERE", test);

  useEffect(() => {
    dispatch(sessionActions.getAllSightings());
    // dispatch(getSightingLikes(currentUser?.id));
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
  }

  const unfavorite = (e) => {
    e.preventDefault();

    const payload = {
      user_id: currentUser.id,
      sighting_id: sightingId
    }

    dispatch(deleteLike(payload))
    localStorage.removeItem(sighting.id)
  }

  const UserEditBtns = (
    currentUser && currentUser?.id === sighting?.user_id ?
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

        {userBtns ?
          <div id="user-btns">
            <button className="black-btn" onClick={handleDelete}>Delete</button>
            <Link className="black-btn" to={`/sightings/edit/${sighting.id}`}>Edit</Link>
          </div>
          : null}
      </>
      :
      null
  )

  const FavoriteBtns = (
    <>
      {likes[sightingId] ?
        <div onClick={(e) => {
          unfavorite(e)
        }}
          className="favorite-btns"
        >
          <MdOutlineBookmarkAdd size={25} />
          <p>Unsave</p>
        </div>
        :
        <div onClick={(e) => {
          favorite(e)
        }}
          className="favorite-btns"
        >
          <MdOutlineBookmarkAdd size={25} />
          <p>Save</p>
        </div>
      }
    </>
  )

  // END OF FUNCS


  return (
    <div id="sighting-container">
      <ul>
        <li id="sighting-actions-btn-container">
          {FavoriteBtns}
          <div id="sighting-edit-btns">
            {UserEditBtns}
          </div>
        </li>
        <li>
          <h1 id="single-sighting-title">{sighting?.title}</h1>
        </li>
        <li>
          <p id="single-sighting-date">{`${sighting?.created_at.split(' ')[2]} ${sighting?.created_at.split(' ')[1]}, ${sighting?.created_at.split(' ')[3]}`}</p>
        </li>
        <li>
          <img src={sighting?.image_url} id="single-sighting-img" alt="article-img"></img>
        </li>
        <li>
          <p id="single-sighting-body">{sighting?.description.replace(/\n+/g, '\n\n')}</p>
        </li>
      </ul>
    </div>
  )
}


export default SingleSighting;
