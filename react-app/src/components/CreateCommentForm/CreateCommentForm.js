import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createAComment } from "../../store/comment";



const CreateCommentForm = () => {
  const params = useParams();
  let currentUser = useSelector(state => state.session.user)
  const { sightingId } = params;
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  console.log(comment)

  const createComment = (e) => {
    e.preventDefault();

    const payload = {
      user_id: currentUser.id,
      sighting_id: sightingId,
      comment: comment
    }

    console.log(payload);

    dispatch(createAComment(payload))
    console.log("INSIDE BTN")
  }

  return (
    <>
      <form onSubmit={createComment}>
        <textarea
        value={comment}
        onChange={(e) => {
          setComment(e.target.value)
        }}
        ></textarea>
        <button>CANCEL</button>
        <button>COMMENT</button>
      </form>
    </>
  )
}


export default CreateCommentForm;
