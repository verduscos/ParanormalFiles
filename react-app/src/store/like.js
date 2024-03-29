const LIKE_SIGHTING = "session/LIKE_SIGHTING"
const REMOVE_LIKE = "session/REMOVE_SIGHTING"
const DISLIKE_SIGHTING = "session/DISLIKE_SIGHITNG"
const REMOVE_DISLIKE = "session/REMOVE_DISLIKE"

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

const removeDislikeSightingAction = (sighting) => ({
  type: REMOVE_DISLIKE,
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
  const response = await fetch(`/api/dislikes/`, {
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
  dispatch(dislikeSightingAction(data));
  return data;
}

export const removeDislikeSighting = (sighitngId, userId) => async (dispatch) => {
  const response = await fetch(`/api/dislikes/`, {
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
    dispatch(removeDislikeSightingAction(data))
    return
  }
}
