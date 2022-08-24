import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deleteASighting } from "../../store/sighting";
import { getSighting } from "../../store/sighting";
import { getSightingLikes, deleteLike, likeSightingThunk } from "../../store/like";
import { deleteBookmark, createBookmark } from "../../store/bookmark";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import "./SingleSighting.css"


const SingleSighting = ({ scrollToTop }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const { sightingId } = params
  const isBookmarked = window.localStorage.getItem(sightingId);
  const [userBookmarked, setUserBookmarked] = useState(false);
  const [userBtns, setUserBtns] = useState(false)
  const currentUser = useSelector(state => state.session.user);
  const currentSighting = useSelector(state => state.sightings.current);
  const likes = useSelector(state => state.likes.total);
  const payload = { userId: currentUser.id, sightingId }


  useEffect(() => {
    scrollToTop();
    dispatch(getSightingLikes(sightingId));
    if (currentSighting === undefined) dispatch(getSighting(sightingId));
    if (isBookmarked) setUserBookmarked(true);
  }, [params, dispatch])


  const addBookmark = (e) => {
    e.preventDefault();
    dispatch(createBookmark(payload));
    setUserBookmarked(true);
    localStorage.setItem(sightingId, sightingId);
  }

  const removeBookmark = () => {
    dispatch(deleteBookmark(payload));
    setUserBookmarked(false);
    localStorage.removeItem(sightingId);
  }

  const deleteSighting = () => {
    dispatch(deleteASighting(sightingId));
    navigate("/mysightings");
  }

  const UserEditBtns = (
    currentUser && currentUser?.id === currentSighting?.user_id ?
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
            <button className="black-btn" onClick={deleteSighting()}>Delete</button>
            <Link className="black-btn" to={`/sightings/edit/${currentSighting.id}`}>Edit</Link>
          </div>
          : null}
      </>
      :
      null
  )

  const Bookmark = (
    <>
      { userBookmarked ?
        <div onClick={(e) => {removeBookmark(e)}} className="favorite-btns" >
          <MdOutlineBookmarkAdd size={25} />
          <p>Unsave</p>
        </div>
        :
        <div onClick={(e) => {addBookmark(e)}} className="favorite-btns" >
          <MdOutlineBookmarkAdd size={25} />
          <p>Save</p>
        </div>}
    </>
  )

  return (
    <div id="sighting-container">
      <ul>
        <li id="sighting-actions-btn-container">
          {Bookmark}
          <div id="sighting-edit-btns">
            {UserEditBtns}
          </div>
        </li>
        {currentSighting !== undefined ?
          <>
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
          </>
          : null}
      </ul>
    </div>
  )
}


export default SingleSighting;
