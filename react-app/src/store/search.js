const SEARCH = "session/SEARCH"


const searchSightings = (searchStr) => ({
  type: SEARCH,
  payload: searchStr
})


export const searchAllSightings = (searchStr) => async (dispatch) => {
  const response = await fetch(`/api/sightings/search/${searchStr}`);

  if (response.status >= 400) {
    throw response
  }

  const data = await response.json();
  dispatch(searchSightings(data));
  return data;

}




const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case SEARCH:
    let search = { ...state }

    // action.payload.forEach(sighting => {
    //   sighting[sighting.id] = sighting
    // })
    console.log(action.payload)
    return search;

    default:
      return state;
  }
};


export default searchReducer;
