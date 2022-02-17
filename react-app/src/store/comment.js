const GET_COMMENTS = "session/GET_COMMENTS"
const CREATE_COMMENT = "session/CREATE_COMMENT"


const getComments = (comments) => ({
  type: GET_COMMENTS,
  payload: comments
})

const createComment = (comment) => ({
  type: CREATE_COMMENT,
  payload: comment
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
    console.log(data)
    dispatch(createComment(data))

    return data;
  }
}


const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return { ...state, ...action.payload.comments }
    case CREATE_COMMENT:
      let comments = {}
      console.log("INSIDE REDUCER")
      console.log(action.payload)
      comments[action.payload.comment.id] = action.payload.comment

      console.log(comments)

      return { ...state, ...comments}
      // return { ...state}
    default:
      return state;
  }
}

export default commentsReducer
