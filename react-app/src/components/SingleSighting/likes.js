import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { likeSighting, removeLikeSighting, dislikeSighting, removeDislikeSighting } from "../../store/like";
import { BsHandThumbsUp, BsHandThumbsDown, BsFillHandThumbsDownFill, BsHandThumbsUpFill } from "react-icons/bs";
import "./SingleSighting.css"


const Likes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const currentUser = useSelector(state => state.session.user);
  const currentSighting = useSelector(state => state.sightings.current);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);
  const { sightingId } = params;

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

  return (
    <div id="sighting-likes-container">
      <li key="sighitng-likes">
        {userLiked ? <BsHandThumbsUpFill onClick={(e) => removeLike(e)} /> : <BsHandThumbsUp onClick={(e) => like(e)} />}
        <h4 key="like-count">{currentSighting.likes}</h4>
      </li>
      <li key="sighting-dislikes">
        {userDisliked ? < BsFillHandThumbsDownFill onClick={(e) => removeDislike(e)} /> : <BsHandThumbsDown onClick={(e) => dislike(e)} />}
        <h4>{currentSighting.dislikes}</h4>
      </li>
    </div>
  )
}

export default Likes;
