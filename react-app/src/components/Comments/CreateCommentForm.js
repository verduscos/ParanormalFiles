import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createAComment } from "../../store/comment";
import "../Comments/Comments.css"



const CreateCommentForm = () => {
  const params = useParams();
  let currentUser = useSelector(state => state.session.user)
  const { sightingId } = params;
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([])
  const [comment, setComment] = useState("");


  const createComment = async (e) => {
    e.preventDefault();

    const payload = {
      user_id: currentUser.id,
      sighting_id: sightingId,
      comment: comment
    }

    if (comment.length >= 4) setComment("")
    const data = await dispatch(createAComment(payload));
    if (data) {
      setErrors(data.errors)
    }
  }

  return (
    <>
      {currentUser ?
        <form id="comment-form-container" onSubmit={createComment}>
          {errors?.map(error => (
            <p>{error.split(":")[1]}</p>
          ))}
          <textarea
            className="comment-textarea"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value)
            }}
          ></textarea>
          <div >
            <button
              className="comment-btns-edit"
              onClick={(e) => {
                e.preventDefault()
                setComment("")
              }}>CANCEL</button>
            <button className="comment-btns-edit">COMMENT</button>
          </div>
        </form>
        :
        null
      }
    </>
  )
}


export default CreateCommentForm;
