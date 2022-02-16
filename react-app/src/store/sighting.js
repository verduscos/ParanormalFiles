const GET_SIGHTINGS = "session/GET_SIGHTING";
const CREATE_SIGHTING = "session/CREATE_SIGHTING"
const GET_SINGLE_SIGHTING = "session/GET_SINGLE_SIGHTING"

const getSightings = (sightings) => ({
    type: GET_SIGHTINGS,
    payload: sightings
})

const getSingleSighting = (sighting) => ({
  type: GET_SINGLE_SIGHTING,
  payload: sighting
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


export const getASighting = (sightingId) => async (dispatch) => {
  const response = await fetch(`/api/sightings/${sightingId}`);

  if (response.status >= 400) {
      throw response
  }

  const data = await response.json();
  dispatch(getSingleSighting(data));
  return data;
}


export const createASighting = (payload) => async (dispatch) => {
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
    return data.errors
  } else {
    dispatch(createSighting(data))
  }
}


const sightingReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SIGHTINGS:
          let sightings = {}

          action.payload.forEach(sighting => {
            sightings[sighting.id] = sighting
          })

          return { ...state, ...sightings }
        case GET_SINGLE_SIGHTING:
            return {...state , singleSighting: action.payload}
        case CREATE_SIGHTING:
          state[action.payload.id] = action.payload
          return {...state}
        default:
            return state
    }
};

export default sightingReducer;
