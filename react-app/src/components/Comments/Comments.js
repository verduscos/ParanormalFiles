import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getALLComments, deleteAComment, updateAComment } from "../../store/comment";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import CreateCommentForm from "../CreateCommentForm/CreateCommentForm";
import "./Comments.css"

const Comments = () => {
  const dispatch = useDispatch();
  const params = useParams()
  const { sightingId } = params;
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState(0);
  const [editForm, displayEditForm] = useState(false);
  const [errors, setErrors] = useState([])
  const [selectedComment, setSelectedComment] = useState(null)
  const [displayUsrBtn, setDisplayUsrBtn] = useState(false);

  const currentUser = useSelector(state => state.session.user)
  let comments = useSelector(state => state.comments)
  let commentsArray = Object.values(comments);

  const deleteComment = (e, id) => {
    e.preventDefault();
    // remove edit and delete btn when a comment is deleted
    setDisplayUsrBtn(!displayUsrBtn)

    dispatch(deleteAComment(id));

  }


  const editComment = (e, id) => {
    const payload = {
      comment_id: commentId,
      comment: comment
    }

    if (comment.length >= 4) {
      // Remove editCommentForm on submission, reset comment and error mssgs
      displayEditForm(!editForm);
      setComment("")
      setErrors([]);

      dispatch(updateAComment(payload))
    } else {
      setErrors(["Comment must be longer than 3 characters"])
    }

  }

  // EDITFORM

  const editComponent = (
    <>
      <textarea
        value={comment}
        onChange={(e) => {
          setComment(e.target.value)
        }}
      >
      </textarea>
      <button onClick={editComment}>Update</button>
    </>
  )


  useEffect(() => {
    dispatch(getALLComments(sightingId))

  }, [dispatch, sightingId])

  return (
    <>

      <div id="comment-header">
        <h3>Comments </h3>
        <p id="comment-count">{commentsArray.length}</p>
      </div>

      {/* Only show comment form if a user is logged in */}
      {currentUser ?
        <CreateCommentForm /> :
        null
      }

      {commentsArray && commentsArray.map(comment => (
        <div id="comments-ul" key={`comment-${comment?.id}-card`}>
          <div>
            <p key={`comment-${comment?.username}`}>{comment?.username}</p>
            {currentUser?.id === comment?.user_id ?
              <BiDotsHorizontalRounded
                value={comment.id}
                onClick={() => {
                  setSelectedComment(comment.id)
                  setDisplayUsrBtn(!displayUsrBtn)
                }} />
              : null}
          </div>
          <p key={`comment-${comment?.id}`}>{comment?.comment}</p>
          {comment?.user_id === currentUser?.id ?
            <>
              {comment.id === selectedComment ? <p>{errors[0]}</p> : null}

              {displayUsrBtn && selectedComment === comment.id ?
                <>
                  <button
                    onClick={() => {
                      displayEditForm(true)
                      setCommentId(comment?.id)
                      setComment(comment?.comment)
                      setDisplayUsrBtn(!displayUsrBtn)
                    }}
                  >Edit</button>
                  <button
                    value={comment?.id}
                    onClick={(e) => {
                      deleteComment(e, comment?.id)
                    }}
                  >Delete</button>
                </>
                : null}


            </>
            :
            null
          }

          {/* only show edit for for currently selected comment and if comment belongs to logged in user */}
          {comment.user_id === currentUser?.id && editForm && selectedComment === comment.id ? editComponent : null}
        </div>
      ))}
    </>
  )
}

export default Comments;
