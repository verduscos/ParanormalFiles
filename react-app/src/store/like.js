const GET_LIKES = "session/GET_LIKES"

const getLikes = (sightingId) => ({
  type:GET_LIKES,
  payload: sightingId
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



const likesReducer = (state = {}, action) => {
  switch (action.type){
    case GET_LIKES:
      let likes = action.payload.likes

      return likes

    default:
      return state;
  }
}


export default likesReducer;
