import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getSighting, deleteASighting } from "../../store/sighting";
import { deleteBookmark, createBookmark } from "../../store/bookmark";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { likeSighting, removeLikeSighting } from "../../store/like";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { BsHandThumbsUp, BsFillHandThumbsUpFill, BsHandThumbsDown, BsFillHandThumbsDownFill, BsHandThumbsUpFill } from "react-icons/bs";
import "./SingleSighting.css"


const SingleSighting = ({ scrollToTop }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const currentUser = useSelector(state => state.session.user);
  const currentSighting = useSelector(state => state.sightings.current);
  const [userBookmarked, setUserBookmarked] = useState(false);
  const [userLiked, setUserLiked] = useState(false);
  const [userBtns, setUserBtns] = useState(false);
  const { sightingId } = params;
  const isBookmarked = window.localStorage.getItem(sightingId);
  const isLiked = window.localStorage.getItem("liked")
  const payload = { userId: currentUser?.id, sightingId };


  const like = (e) => {
    e.preventDefault();
    dispatch(likeSighting(sightingId, currentUser.id));
    dispatch(getSighting(sightingId));
    localStorage.setItem("liked", currentSighting?.id);
    setUserLiked(true);
  }

  const removeLike = (e) => {
    e.preventDefault();
    dispatch(removeLikeSighting(sightingId, currentUser.id));
    dispatch(getSighting(sightingId));
    localStorage.removeItem("liked");
    setUserLiked(false);
  }

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

  const deleteSighting = (e) => {
    e.preventDefault();
    dispatch(deleteASighting(sightingId));
    navigate("/mysightings");
  }

  const editSighting = () => {
    window.localStorage.setItem("currentSighting", JSON.stringify(currentSighting));
    navigate(`/sightings/edit/${currentSighting.id}`);
  }

  useEffect(() => {
    scrollToTop();
    dispatch(getSighting(sightingId))
    if (isBookmarked) setUserBookmarked(true);
    if (isLiked === sightingId) setUserLiked(true);
  }, [dispatch, isLiked])


  const Bookmark = (
    <>
      {userBookmarked ?
        <div onClick={(e) => { removeBookmark(e) }} className="favorite-btns" >
          <MdOutlineBookmarkAdd size={25} />
          <p>Remove Bookmark</p>
        </div>
        :
        <div onClick={(e) => { addBookmark(e) }} className="favorite-btns" >
          <MdOutlineBookmarkAdd size={25} />
          <p>Bookmark</p>
        </div>}
    </>
  )

  const UserBtns = (
    currentUser && currentUser?.id === currentSighting?.user_id ?
      <>
        <span
          onClick={() => { setUserBtns(!userBtns) }}>
          <BiDotsHorizontalRounded size={25} />
        </span>
        {userBtns ?
          <div id="user-btns">
            <button className="black-btn" onClick={(e) => deleteSighting(e)}>Delete</button>
            <button className="black-btn" onClick={(e) => editSighting(e)}>Edit</button>
          </div>
          : null}
      </>
      :
      null
  )

  return (
    <div id="sighting-container">
      <ul>
        <li id="sighting-actions-btn-container">
          {Bookmark}
          <div id="sighting-edit-btns">
            {UserBtns}
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
              { userLiked ? <BsHandThumbsUpFill onClick={(e) => removeLike(e)} /> : <BsHandThumbsUp onClick={(e) => like(e)} /> }
              <h4 key="like-num">{currentSighting.likes}</h4>
            </li>
            <li key="dislikes">
              <FiThumbsDown />
              <h4>{currentSighting.dislikes}</h4>
            </li>
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
