import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as sessionActions from "../../store/sighting"
import { deleteLike, likeSightingThunk } from "../../store/like";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import "./SingleSighting.css"


const SingleSighting = ( { test } ) => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const params = useParams()
  const { sightingId } = params
  const [userBtns, setUserBtns] = useState(false)
  let sighting = useSelector(state => state.sightings[sightingId])
  let current = useSelector(state => state.sightings.current);
  let currentUser = useSelector(state => state.session.user)
  let likes = useSelector(state => state.likes)
  // let currentSighting = JSON.parse(window.localStorage.getItem("currentSighting"));
  let currentSighting;

  const setSighting = () => {
    current ? currentSighting = current : currentSighting =JSON.parse(window.localStorage.getItem("currentSighting"));
  };

  setSighting();


  console.log("not in useEffect", current)

  useEffect(() => {
    if (current) {
      console.log("inside useEffect", current);
      window.localStorage.setItem("currentSighting", JSON.stringify(current));
    }
  }, [current])

// console.log("state", sighting?.title);
// console.log("localstorage", currentSighting);

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
          <h1 id="single-sighting-title">{currentSighting.title}</h1>
        </li>
        <li>
          <p id="single-sighting-date">{`${currentSighting.created_at.split(' ')[2]} ${currentSighting.created_at.split(' ')[1]}, ${currentSighting.created_at.split(' ')[3]}`}</p>
        </li>
        <li>
          <img src={currentSighting.image_url} id="single-sighting-img" alt="article-img"></img>
        </li>
        <li>
          <p id="single-sighting-body">{currentSighting.description.replace(/\n+/g, '\n\n')}</p>
        </li>
      </ul>
    </div>
  )
}


export default SingleSighting;
