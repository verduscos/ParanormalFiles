import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createAComment } from "../../store/comment";
import { BiUserCircle } from "react-icons/bi";
import "./Form.css";


const CreateCommentForm = () => {
  let currentUser = useSelector(state => state.session.user)
  const params = useParams();
  const { sightingId } = params;
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([])
  const [comment, setComment] = useState("");
  const [displayForm, setDisplayForm] = useState(false);


  const createComment = async (e) => {
    e.preventDefault();
    const payload = {
      user_id: currentUser.id,
      sighting_id: sightingId,
      comment: comment
    }

    if (comment.length >= 4) setComment("")
    const data = await dispatch(createAComment(payload));
    if (data.errors) {
      setErrors(data.errors)
    } else {
      setDisplayForm(!displayForm)
      setErrors([]);
    }
  }

  return (
    <>
      {currentUser ?
        <div id="comment-form-container">
          <BiUserCircle />
          {displayForm ?
              <form id="comment-form" onSubmit={createComment}>
                {errors?.map(error => (
                  <p>{error.split(":")[1]}</p>
                ))}
                <textarea
                  className="comment-textarea"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value)
                  }}
                ></textarea>
                <div >
                  <button
                    className="comment-btn"
                    onClick={(e) => {
                      e.preventDefault()
                      setDisplayForm(!displayForm)
                    }}>CANCEL</button>
                  <button className="comment-btn blue">COMMENT</button>
                </div>
              </form>
            :
            <div id="comment-trigger-container">
              <button onClick={() => setDisplayForm(!displayForm)}>Add a comment...</button>
            </div>
          }
        </div>

        : null}
    </>
  )
}


export default CreateCommentForm;
