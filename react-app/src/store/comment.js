const GET_COMMENTS = "session/GET_COMMENTS"
const CREATE_COMMENT = "session/CREATE_COMMENT"
const DELETE_COMMENT = "session/DELETE_ACTION"


const getComments = (comments) => ({
  type: GET_COMMENTS,
  payload: comments
})

const createComment = (comment) => ({
  type: CREATE_COMMENT,
  payload: comment
})

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId
})


export const getALLComments = (sightingId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${sightingId}`)

  if (response.status >= 400) {
    throw response
  }

  const data = await response.json();
  dispatch(getComments(data));
  return data;

}

export const createAComment = (payload) => async (dispatch) => {
  const response = await fetch(`/api/comments/${payload.sighting_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: payload.user_id,
      sighting_id: payload.sighting_id,
      comment: payload.comment
    })
  })

  if (response.status >= 400) {
    throw response;
  }

  if (response.ok) {
    const data = await response.json();
    dispatch(createComment(data))

    return data;
  }
}

export const deleteAComment = (payload) => async (dispatch) => {
  const response = await fetch(`/api/comments/${payload}`, {
    method: "DELETE",
  })
  console.log(payload, "INSIDE THUNKERUKEKKRERR")
  if (response.ok) {
    const data = await response.json();
    console.log(data)
    dispatch(deleteComment(data))
    return
  }
}


const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      let comments1 = { ...action.payload.comments}

      return { ...comments1 }
    case CREATE_COMMENT:
      let comments = {}
      comments[action.payload.comment.id] = action.payload.comment

      return { ...state, ...comments}
    case DELETE_COMMENT:
      let comments3 = { ...state}

      console.log("THIS IS THE ACTION", action.payload)
      // console.log(action.payload["delete"])
      // console.log(typeof action.payload.delete)
      console.log(comments3)
      let id = (action.payload["delete"])
      delete comments3[id]

      return comments3
    default:
      return state;
  }
}

export default commentsReducer
