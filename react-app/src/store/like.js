const LIKE_SIGHTING = "session/LIKE_SIGHTING"
const REMOVE_LIKE = "session/REMOVE_SIGHTING"

const likeSightingAction = (sighting) => ({
  type: LIKE_SIGHTING,
  payload: sighting
})

const removeLikeSightingAction = (sighting) => ({
  type: REMOVE_LIKE,
  payload: sighting
})


export const removeLikeSighting = (payload) => async (dispatch) => {
  const response = await fetch(`/api/likes/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify({
        user_id: parseInt(payload.user_id),
        sighting_id: parseInt(payload.sighting_id)
      })
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(removeLikeSightingAction(data))
    return
  }
}

export const likeSighting = (sighitngId, userId) => async (dispatch) => {
  console.log(userId, sighitngId)
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

const likesReducer = (state = { likes : 0}, action) => {
  switch (action.type){
    case REMOVE_LIKE:
      const likes = { ...state }
      const id = action.payload["deleted"]

      delete likes[id];
      return likes
    case LIKE_SIGHTING: {
      const likes = { ...state }
      likes[action.payload.likes.id] = action.payload.likes;

      return likes;
    }
    default:
      return state;
  }
}


export default likesReducer;
