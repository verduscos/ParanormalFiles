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
  const [displayDots, setDisplayDots] = useState(true)

  const currentUser = useSelector(state => state.session.user)
  let comments = useSelector(state => state.comments)
  let commentsArray = Object.values(comments);
  let commentsReversedArray = commentsArray.reverse()

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
      setDisplayDots(true)
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
        className="comment-textarea"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value)
        }}
      >
      </textarea>
      <button className="comment-btns-edit" onClick={editComment}>Update</button>
      <button className="comment-btns-edit"
        onClick={() => {
          displayEditForm(false)
          setDisplayDots(true)
        }}>Cancel</button>
    </>
  )


  useEffect(() => {
    dispatch(getALLComments(sightingId))

  }, [dispatch, sightingId])

  return (
    <div id="comments-container">
      <ul>
        <li id="comment-header-container">
          <h2>Comments </h2>
          <p id="comment-count">{commentsArray.length}</p>
        </li>
        <li>
          {currentUser ?
            <CreateCommentForm /> :
            null
          }
        </li>
        <li>


          {commentsArray && commentsReversedArray.map(comment => (
            <div id="comments-ul" key={`comment-${comment?.id}-card`}>
              <div>
                <p key={`comment-${comment?.username}`}>{comment?.username}</p>
                <p key={`comment-${comment?.created_at}`}>{`${comment?.created_at.split(' ')[2]} ${comment.created_at.split(' ')[1]}, ${comment.created_at.split(' ')[3]}`}</p>
                {currentUser?.id === comment?.user_id && displayDots ?
                  <BiDotsHorizontalRounded
                    id="comment-dots"
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
                        className="comment-btns-edit"
                        onClick={() => {
                          displayEditForm(true)
                          setDisplayDots(false)
                          setCommentId(comment?.id)
                          setComment(comment?.comment)
                          setDisplayUsrBtn(!displayUsrBtn)
                        }}
                      >Edit</button>
                      <button
                        className="comment-btns-edit"
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
        </li>
      </ul>
    </div>
  )
}

export default Comments;
