// const SEARCH = "session/SEARCH"


// const searchSightings = (searchStr) => ({
//   type: SEARCH,
//   payload: searchStr
// })


// export const searchAllSightings = (searchStr) => async (dispatch) => {
//   const response = await fetch(`/api/sightings/search/${searchStr}`);
//   console.log("INSIDE THUNKs")
//   if (response.status >= 400) {
//     console.log(response)
//     throw response
//   }

//   const data = await response.json();
//   dispatch(searchSightings(data));
//   console.log(data)
//   return data;

// }




// const searchReducer = (state = {}, action) => {
//   switch (action.type) {
//     case SEARCH:
//     let search = {}

//     if (action.payload["sightings"]) {

//       action.payload["sightings"].forEach(sighting => {
//         console.log("INSDIE LOOP", sighting)
//         search[sighting["id"]] = sighting
//       })

//       return { ...state, ...search};
//     }

//     default:
//       return state;
//   }
// };


// export default searchReducer;
