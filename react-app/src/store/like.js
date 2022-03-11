const GET_LIKES = "session/GET_LIKES"
const LIKE_SIGHTING = "session/LIKE_SIGHTING"

const getLikes = (sightingId) => ({
  type:GET_LIKES,
  payload: sightingId
})

const likeSighting = (sighting) => ({
  type: LIKE_SIGHTING,
  payload: sighting
})


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
  const response = await fetch(`/api/likes/${payload.user_id}`, {
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
  console.log("TEESTEST")
  return data;

}



const likesReducer = (state = {}, action) => {
  switch (action.type){
    case GET_LIKES:
      let likes = action.payload.likes

      return likes

    // case LIKE_SIGHTING:



    default:
      return state;
  }
}


export default likesReducer;
