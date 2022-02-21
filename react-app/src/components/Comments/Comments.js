import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getALLComments, deleteAComment, updateAComment } from "../../store/comment";
import CreateCommentForm from "../CreateCommentForm/CreateCommentForm";
import "./Comments.css"

const Comments = () => {
  const dispatch = useDispatch();
  const params = useParams()
  const { sightingId } = params;
  // const [commentId, setCommentId] = useState(0);
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState(0);
  const [editForm, displayEditForm] = useState(false);
  let currentUser = useSelector(state => state.session.user)
  let comments = useSelector(state => state.comments)
  let commentsArray = Object.values(comments);

  const deleteComment = (e, id) => {
    e.preventDefault();
    dispatch(deleteAComment(id));

  }


  const editComment = (e, id) => {
    const payload = {
      comment_id: commentId,
      comment: comment
    }

    dispatch(updateAComment(payload))
  }

  // EDITFORM

  const editComponent = (
    <>
      <textarea
        onChange={(e) => {
          setComment(e.target.value)
        }}
      >
      </textarea>
      <button onClick={editComment}>Edit</button>
    </>
  )

  // EDITFORM


  useEffect(() => {
    dispatch(getALLComments(sightingId))

  }, [dispatch, sightingId])

  return (
    <>

      <div id="comment-header">
        <h3>Comments </h3>
        <p id="comment-count">{commentsArray.length}</p>
      </div>

      {currentUser ?
        <CreateCommentForm /> :
        null
      }

      {commentsArray?.map(comment => (
        <div id="comments-ul" key={`comment-${comment?.id}-card`}>
          <p key={`comment-${comment?.username}`}>{comment.username}</p>
          <p key={`comment-${comment?.id}`}>{comment?.comment}</p>
          {comment?.user_id === currentUser?.id ?
            <>
              <button
                onClick={() => {
                  displayEditForm(true)
                  setCommentId(comment?.id)
                }}
              >Edit</button>
              <button
                value={comment?.id}
                onClick={(e) => {
                  // setCommentId(e.target.value)
                  deleteComment(e, comment?.id)
                }}
              >Delete</button>
            </>
            :
            null
          }
          {comment.user_id === currentUser?.id && editForm ? editComponent : null}
        </div>
      ))}
    </>
  )
}

export default Comments;
