const GET_LIKES = "session/GET_LIKES"
const LIKE_SIGHTING = "session/LIKE_SIGHTING"
const REMOVE_LIKE = "session/REMOVE_SIGHTING"

const getLikes = (sightingId) => ({
  type:GET_LIKES,
  payload: sightingId
})

const likeSighting = (sighting) => ({
  type: LIKE_SIGHTING,
  payload: sighting
})

const removeSighting = (sighting) => ({
  type: REMOVE_LIKE,
  payload: sighting
})


export const deleteLike = (payload) => async (dispatch) => {
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
    dispatch(removeSighting(data))
    return
  }
}

export const getSightingLikes = (sightingId) => async (dispatch) => {
  const response = await fetch(`/api/likes/${sightingId}`)

  if(response.status >= 400) {
    throw response
  }

  const data = await response.json();

  dispatch(getLikes(data));
  return data;

}

export const likeSightingThunk = (payload) => async (dispatch) => {
  const response = await fetch(`/api/likes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: payload.user_id,
      sighting_id: payload.sighting_id
    })
  });


  const data = await response.json();

  dispatch(likeSighting(data));
  return data;

}





const likesReducer = (state = {}, action) => {
  switch (action.type){
    case GET_LIKES:
      let likes = { ...state }

      action.payload.likes.forEach(liked => {
        likes[liked.id] = liked
      })

      return { ...likes }

    case REMOVE_LIKE:
      let likess = { ...state }
      let id = action.payload["deleted"]

      delete likess[id];
      return likess

    case LIKE_SIGHTING:
      let like = { ...state }

      like[action.payload.likes.id] = action.payload.likes;

      return like

    default:
      return state;
  }
}


export default likesReducer;
