const SEARCH = "session/SEARCH"


const searchSightings = (searchStr) => ({
  type: SEARCH,
  payload: searchStr
})


export const searchAllSightings = (searchStr) => async (dispatch) => {
  const response = await fetch(`/api/sightings/search/${searchStr}`);
  console.log("INSIDE THUNKs")
  if (response.status >= 400) {
    console.log(response)
    throw response
  }

  const data = await response.json();
  dispatch(searchSightings(data));
  console.log(data)
  return data;

}




const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case SEARCH:
    let search = {}
    console.log("inside REDUCER")
    if (action.payload["sightings"]) {

      action.payload["sightings"].forEach(sighting => {
        console.log("INSDIE LOOP", sighting)
        sighting[sighting.id] = sighting
      })
      // console.log(action.payload["sightings"])
      console.log("hereHErehhrHEHHRHEHR")
      return search;
    }

    default:
      return state;
  }
};


export default searchReducer;
