const CREATE_COMMENT = "session/CREATE_COMMENT"
const GET_SIGHTING_COMMENTS = "session/GET_COMMENTS"
const UPDATE_COMMENT = "session/UPDATE_COMMENT"
const DELETE_COMMENT = "session/DELETE_ACTION"

const createComment = (comment) => ({
  type: CREATE_COMMENT,
  payload: comment
})

const getComments = (comments, userLeftComment) => ({
  type: GET_SIGHTING_COMMENTS,
  payload: comments,
  userLeftComment: userLeftComment
})

const updateCommnet = (comment) => ({
  type: UPDATE_COMMENT,
  payload: comment
})

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId
})


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
    return data;
  } else {
    dispatch(createComment(data));
    return data;
  }
}

export const getALLComments = (sightingId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${sightingId}`)
  if (response.status >= 400) {
    throw response;
  }
  const data = await response.json();
  dispatch(getComments(data));
  return data;
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
  const data = await response.json();
  dispatch(updateCommnet(data));
}

export const deleteAComment = (payload) => async (dispatch) => {
  const response = await fetch(`/api/comments/${payload}`, {
    method: "DELETE",
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteComment(data));
    return;
  }
}

const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COMMENT: {
      const newState = { ...state };
      newState[action.payload.comment.id] = action.payload.comment;
      return newState;
    }

    case GET_SIGHTING_COMMENTS: {
      const newState = { ...state };
      action.payload.comments.forEach(comment => {
        newState[comment.id] = comment;
      })
      return newState;
    }

    case UPDATE_COMMENT: {
      const newState = { ...state };
      newState[action.payload.comment.id] = action.payload.comment;
      return newState;
    }

    case DELETE_COMMENT: {
      const newState = { ...state };
      const id = (action.payload["delete"]);
      delete newState[id];
      return newState;
    }

    default:
      return state;
  }
}

export default commentsReducer
