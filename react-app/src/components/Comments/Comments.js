import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getALLComments, deleteAComment } from "../../store/comment";
import CreateCommentForm from "../CreateCommentForm/CreateCommentForm";

const Comments = () => {
  const dispatch = useDispatch();
  const params = useParams()
  const { sightingId } = params;
  const [commentId, setCommentId] = useState(0);
  let currentUser = useSelector(state => state.session.user)
  let comments = useSelector(state => state.comments)
  let commentsArray = Object.values(comments);

  const deleteComment = (e, id) => {
    e.preventDefault();
    // setCommentId(id)
    console.log(id, "INSIDE DELTE BTN")

    dispatch(deleteAComment(id))

  }

  useEffect(() => {
    dispatch(getALLComments(sightingId))
  }, [dispatch, sightingId])

  return (
    <>
      { currentUser ?
        <CreateCommentForm /> :
        null
      }
      <h3>Comments</h3>
      {commentsArray?.map(comment => (
        <ul key={`comment-${comment.id}-card`}>
          <p key={`comment-${comment.username}`}>{comment.username}</p>
          <p key={`comment-${comment.id}`}>{comment.comment}</p>
          { comment.user_id === currentUser.id ?
            <>
            <button>Edit</button>
            <button
            value={comment.id}
            onClick={(e) => {
              // setCommentId(e.target.value)
              deleteComment(e, comment.id)
            }}
            >Delete</button>
            </>
            :
            null
          }
        </ul>
      ))}
    </>
  )
}

export default Comments;
