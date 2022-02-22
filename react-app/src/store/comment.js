const GET_COMMENTS = "session/GET_COMMENTS"
const CREATE_COMMENT = "session/CREATE_COMMENT"
const UPDATE_COMMENT = "session/UPDATE_COMMENT"
const DELETE_COMMENT = "session/DELETE_ACTION"


const getComments = (comments, userLeftComment) => ({
  type: GET_COMMENTS,
  payload: comments,
  userLeftComment: userLeftComment
})

const createComment = (comment) => ({
  type: CREATE_COMMENT,
  payload: comment
})

const updateCommnet = (comment) => ({
  type: UPDATE_COMMENT,
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

    const data = await response.json();

    if (data.errors) {
      return data
    } else {
      dispatch(createComment(data))
      return data
    }
}

export const updateAComment = (payload) => async (dispatch) => {
  const response = await fetch(`/api/comments/${payload.comment_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      comment_id: payload.comment_id,
      comment: payload.comment
    })
  })

  const data = await response.json()
  dispatch(updateCommnet(data))
}

export const deleteAComment = (payload) => async (dispatch) => {
  const response = await fetch(`/api/comments/${payload}`, {
    method: "DELETE",
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteComment(data))
    return
  }
}


const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      let comments1 = {}

      action.payload.comments.forEach(comment => {
        comments1[comment.id] = comment
      })

      return {  ...comments1}
    case CREATE_COMMENT:
      let comments = {}
      comments[action.payload.comment.id] = action.payload.comment

      return { ...state, ...comments}
    case UPDATE_COMMENT:
      let comments2 = { ...state}
      comments2[action.payload.comment.id] = action.payload.comment

      return comments2
    case DELETE_COMMENT:
      let comments3 = { ...state}

      let id = (action.payload["delete"])
      delete comments3[id]

      return comments3
    default:
      return state;
  }
}

export default commentsReducer
