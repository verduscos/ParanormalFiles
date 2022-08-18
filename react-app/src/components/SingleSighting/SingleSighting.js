import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as sessionActions from "../../store/sighting"
import { getSightingLikes, deleteLike, likeSightingThunk } from "../../store/like";
import { deleteBookmark } from "../../store/bookmark";

import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import "./SingleSighting.css"


const SingleSighting = ({ scrollToTop }) => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const params = useParams()
  const { sightingId } = params
  const [userBtns, setUserBtns] = useState(false)
  let sighting = useSelector(state => state.sightings[sightingId])
  let current = useSelector(state => state.sightings.current);
  let currentUser = useSelector(state => state.session.user)
  let bookmarks = useSelector(state => state.session.bookmarks);
  let likes = useSelector(state => state.likes.total)
  let currentSighting;

  useEffect(() => {
    dispatch(getSightingLikes(sightingId));
  }, [dispatch])

  const setSighting = () => {
    if (current) {
      currentSighting = current
      window.localStorage.setItem("currentSighting", JSON.stringify(currentSighting));
    } else {
      currentSighting = JSON.parse(window.localStorage.getItem("currentSighting"));
    }
  };

  setSighting();
  scrollToTop();


  const favorite = (e) => {
    e.preventDefault();
    const payload = {
      user_id: currentUser.id,
      sighting_id: sightingId
    }
    // dispatch(boo(payload))
    localStorage.setItem(sightingId, true)
  }

  const unfavorite = (e) => {
    e.preventDefault();
    const payload = {
      user_id: currentUser.id,
      sighting_id: sightingId
    }
    dispatch(deleteBookmark(payload))
    localStorage.removeItem(sightingId)
  }

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(sessionActions.deleteASighting(sightingId))
    history.push("/mysightings")
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
      {localStorage.getItem(`${sightingId}`) ?
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
          <h1 id="single-sighting-title">{currentSighting.title}</h1>
        </li>
        <li>
          <p id="single-sighting-date">{`${currentSighting.created_at.split(' ')[2]} ${currentSighting.created_at.split(' ')[1]}, ${currentSighting.created_at.split(' ')[3]}`}</p>
        </li>
        <li>
          <img src={currentSighting.image_url} id="single-sighting-img" alt="article-img"></img>
        </li>
        <li key="likes">
          <FiThumbsUp />
          <h4>{likes}</h4>
        </li>
        {/* <li>
          <FiThumbsDown />
        </li> */}
        <li>
          <p id="single-sighting-body">{currentSighting.description.replace(/\n+/g, '\n\n')}</p>
        </li>
      </ul>
    </div>
  )
}


export default SingleSighting;
