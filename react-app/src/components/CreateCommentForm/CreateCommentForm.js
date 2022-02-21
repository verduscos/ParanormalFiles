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

    const data =  await dispatch(createAComment(payload));
    if (data) {
      console.log(data)
      setErrors(data.errors)
    } else {
      return
    }
  }

  return (
    <>
      <form onSubmit={createComment}>
      {errors?.map(error => (
            <p>{error.split(":")[1]}</p>
          ))}
        <textarea
          id="comment-textarea"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value)
          }}
        ></textarea>
        <div id="comment-btns">
          <button onClick={() => {
            setComment("")
          }}>CANCEL</button>
          <button id="submit-comment">COMMENT</button>
        </div>
      </form>
    </>
  )
}


export default CreateCommentForm;
