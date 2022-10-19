const LIKE_SIGHTING = "session/LIKE_SIGHTING"
const REMOVE_LIKE = "session/REMOVE_SIGHTING"
const DISLIKE_SIGHTING = "session/DISLIKE_SIGHITNG"

const likeSightingAction = (sighting) => ({
  type: LIKE_SIGHTING,
  payload: sighting
})

const removeLikeSightingAction = (sighting) => ({
  type: REMOVE_LIKE,
  payload: sighting
})

const dislikeSightingAction = (sighting) => ({
  type: DISLIKE_SIGHTING,
  payload: sighting
})


export const removeLikeSighting = (sighitngId, userId) => async (dispatch) => {
  const response = await fetch(`/api/likes/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify({
        user_id: userId,
        sighting_id: sighitngId
      })
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(removeLikeSightingAction(data))
    return
  }
}

export const likeSighting = (sighitngId, userId) => async (dispatch) => {
  const response = await fetch(`/api/likes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: userId,
      sighting_id: sighitngId
    })
  });

  const data = await response.json();
  dispatch(likeSightingAction(data));
  return data;
}

export const dislikeSighting = (sighitngId, userId) => async (dispatch) => {
  const response = await fetch(`/api/dislikes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: userId,
      sighting_id: sighitngId
    })
  });

  const data = await response.json();
  dispatch(dislikeSightingAction(data));
  return data;
}

const likesReducer = (state = { likes : 0}, action) => {
  switch (action.type){
    case REMOVE_LIKE:
      const likes = { ...state }
      const id = action.payload["deleted"]

      delete likes[id];
      return likes
    case LIKE_SIGHTING: {
      const likes = { ...state }
      likes[action.payload.likes?.id] = action.payload.likes;

      return likes;
    }
    default:
      return state;
  }
}


export default likesReducer;
