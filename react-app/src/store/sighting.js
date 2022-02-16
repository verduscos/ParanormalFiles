const GET_SIGHTING = "session/GET_SIGHTING";
const CREATE_SIGHTING = "session/CREATE_SIGHTING"

const getSightings = (sightings) => ({
    type: GET_SIGHTING,
    payload: sightings
})

const createSighting = (sighting) => ({
  type: CREATE_SIGHTING,
  payload: sighting
})

export const getAllSightings = () => async (dispatch) => {
    const response = await fetch(`/api/sightings/`);

    if (response.status >= 400) {
        throw response
    }

    const data = await response.json();
    dispatch(getSightings(data.sightings));
    return data;
}


export const createASighting = (payload) => async (dispatch) => {
  console.log("INSIDE THUNK")

  const response = await fetch(`/api/sightings/`, {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      user_id: payload.user_id,
      date: payload.date,
      title: payload.title,
      description: payload.description,
      category: payload.category,
      location: payload.location
    })
  })
  const data = await response.json()

  if (data.errors) {
    console.log('inside ERRORS')
    return data.errors
  } else {
    dispatch(createSighting(data))
  }
}


const sightingReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SIGHTING:
          let sightings = {}

          action.payload.forEach(sighting => {
            sightings[sighting.id] = sighting
          })

          return { ...state, ...sightings }
        case CREATE_SIGHTING:
          console.log("INSIDE REDUCER")
          console.log(state)
          console.log(action.payload)
          state[action.payload.id] = action.payload
          return {...state}
        default:
            return state
    }
};

export default sightingReducer;
