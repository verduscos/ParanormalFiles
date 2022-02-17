import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getALLComments } from "../../store/comment";

const Comments = () => {
  const dispatch = useDispatch();
  const params = useParams()
  const { sightingId } = params;
  let comments = useSelector(state => state.comments)
  let commentsArray = Object.values(comments);

  useEffect(() => {
    dispatch(getALLComments(sightingId))
  }, [dispatch, sightingId])

  return (
    <>
      <h3>Comments</h3>
      {commentsArray.map(comment => (
        <ul key={`comment-${comment.id}-card`}>
          <p key={`comment-${comment.username}`}>{comment.username}</p>
          <p key={`comment-${comment.id}`}>{comment.comment}</p>
        </ul>
      ))}
    </>
  )
}

export default Comments;
