import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getSighting, deleteASighting } from "../../store/sighting";
import { deleteBookmark, createBookmark } from "../../store/bookmark";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { likeSighting, removeLikeSighting, dislikeSighting, removeDislikeSighting } from "../../store/like";
import { BsHandThumbsUp, BsHandThumbsDown, BsFillHandThumbsDownFill, BsHandThumbsUpFill } from "react-icons/bs";
import "./SingleSighting.css"


const SingleSighting = ({ scrollToTop }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const currentUser = useSelector(state => state.session.user);
  const currentSighting = useSelector(state => state.sightings.current);
  const [userBookmarked, setUserBookmarked] = useState(false);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);
  const [userBtns, setUserBtns] = useState(false);
  const { sightingId } = params;
  const isBookmarked = window.localStorage.getItem(sightingId);
  const isLiked = window.localStorage.getItem("liked")
  const isDisliked = window.localStorage.getItem("disliked")
  const payload = { userId: currentUser?.id, sightingId };


  const like = (e) => {
    e.preventDefault();
    if (userDisliked) removeDislike(e);
    dispatch(likeSighting(sightingId, currentUser.id));
    localStorage.setItem("liked", currentSighting?.id);
    currentSighting.likes = String(parseInt(currentSighting.likes) + 1);
    setUserLiked(true);
  }

  const removeLike = (e) => {
    e.preventDefault();
    dispatch(removeLikeSighting(sightingId, currentUser.id));
    localStorage.removeItem("liked");
    currentSighting.likes = String(parseInt(currentSighting.likes) - 1);
    setUserLiked(false);
  }

  const dislike = (e) => {
    e.preventDefault();
    if (userLiked) removeLike(e);
    dispatch(dislikeSighting(sightingId, currentUser.id));
    localStorage.setItem("disliked", currentSighting?.id);
    currentSighting.dislikes = String(parseInt(currentSighting.dislikes) + 1);
    setUserDisliked(true);
  }

  const removeDislike = (e) => {
    e.preventDefault();
    dispatch(removeDislikeSighting(sightingId, currentUser?.id));
    localStorage.removeItem("disliked");
    currentSighting.dislikes = String(parseInt(currentSighting.dislikes) - 1);
    setUserDisliked(false);
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
    if (isBookmarked) setUserBookmarked(true);
    if (isLiked === sightingId) setUserLiked(true);
    if (isDisliked === sightingId) setUserDisliked(true);
    dispatch(getSighting(sightingId));
  }, [])

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
        <li id="sighting-actions-btn-container" key="user-actions">
          {Bookmark}
          <div id="sighting-edit-btns">
            {UserBtns}
          </div>
        </li>
        {currentSighting !== undefined ?
          <>
            <li key="sighting-title">
              <h1 id="single-sighting-title">{currentSighting.title}</h1>
            </li>
            <li key="sighting-date">
              <p id="single-sighting-date">{`${currentSighting.created_at.split(' ')[2]} ${currentSighting.created_at.split(' ')[1]}, ${currentSighting.created_at.split(' ')[3]}`}</p>
            </li>
            <li key="sighting-image">
              <img src={currentSighting.image_url} id="single-sighting-img" alt="article-img"></img>
            </li>
            <div id="sighting-likes-container">
              {
                userLiked ?
                  <li key="sighting-likes" onClick={(e) => removeLike(e)}>
                    < BsHandThumbsUpFill />
                    <h4>{currentSighting.likes}</h4>
                  </li>
                  :
                  <li key="sighting-likes" onClick={(e) => like(e)}>
                    <BsHandThumbsUp />
                    <h4>{currentSighting.likes}</h4>
                  </li>
              }

              {
                userDisliked ?
                  <li key="sighting-dislikes" onClick={(e) => removeDislike(e)}>
                    < BsFillHandThumbsDownFill />
                    <h4>{currentSighting.dislikes}</h4>
                  </li>
                  :
                  <li key="sighting-dislikes" onClick={(e) => dislike(e)}>
                    <BsHandThumbsDown />
                    <h4>{currentSighting.dislikes}</h4>
                  </li>
              }
            </div>
            <li key="sighting-body">
              <p id="single-sighting-body">{currentSighting.description.replace(/\n+/g, '\n\n')}</p>
            </li>
          </>
          : null}
      </ul>
    </div>
  )
}

export default SingleSighting;
