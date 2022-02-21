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
  // const [commentId, setCommentId] = useState(0);
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState(0);
  const [editForm, displayEditForm] = useState(false);
  const [errors, setErrors] = useState([])
  const [displayUsrBtn, setDisplayUsrBtn] = useState(false);

  const currentUser = useSelector(state => state.session.user)
  let comments = useSelector(state => state.comments)
  // let test = useSelector(state => state.comments)
  // console.log(Object.values(test.comments))
  // console.log(comments)
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
      // Remove editCommentForm on submission and reset error mssgs
      displayEditForm(!editForm);
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
    dispatch(getALLComments(sightingId, currentUser?.id))

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
          <div>
            <p key={`comment-${comment?.username}`}>{comment?.username}</p>
            {currentUser.id === comment?.user_id ?
              <BiDotsHorizontalRounded onClick={() => {
                setDisplayUsrBtn(!displayUsrBtn)
              }} />
              : null}
          </div>
          <p key={`comment-${comment?.id}`}>{comment?.comment}</p>
          {comment?.user_id === currentUser?.id ?
            <>
              {errors?.map(error => (
                <p>{error}</p>
              ))}


              {displayUsrBtn ?
                <>
                  <button
                    onClick={() => {
                      displayEditForm(true)
                      setCommentId(comment?.id)
                      setDisplayUsrBtn(!displayUsrBtn)
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
                : null}


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
