const GET_SIGHTINGS = "session/GET_SIGHTING";
const CREATE_SIGHTING = "session/CREATE_SIGHTING"
const EDIT_SIGHTING = "session/EDIT_SIGHTING"
const DELETE_SIGHTING = "session/DELETE_SIGHTING"

const getSightings = (sightings) => ({
    type: GET_SIGHTINGS,
    payload: sightings
})

const createSighting = (sighting) => ({
  type: CREATE_SIGHTING,
  payload: sighting
})

const deleteSighting = (sightingId) => ({
  type: DELETE_SIGHTING,
  payload: sightingId
})

const editSighting = (sighting) => ({
  type: EDIT_SIGHTING,
  payload:sighting
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
  console.log(data)
  console.log("NO ERROR")
  if (data.errors) {
    console.log("INSIDE THUINK ERROR")
    return data
  } else {
    dispatch(createSighting(data))
    return data
  }
}

export const updateSighting = (payload) => async (dispatch) => {
  console.log("taklaklfsdjkls")
  const response = await fetch(`/api/sightings/${payload.sighting_id}`, {
    method: "PUT",
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
  console.log("taklaklfsdjkls")

  const data = await response.json()
  console.log("INSID THUNK")
  if (data.errors) {
    console.log(data)
    return data
  } else {
    dispatch(editSighting(data))
    return data
  }
  console.log("taklaklfsdjkls")

}









export const deleteASighting = (sightingId) => async (dispatch) => {
  const response = await fetch(`/api/sightings/${sightingId}`, {
    method: "DELETE"
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteSighting(data))
    return
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
        case CREATE_SIGHTING:
          state[action.payload.id] = action.payload
          return {...state}
        case EDIT_SIGHTING:
          return {...state}
        case DELETE_SIGHTING:
          let updatedSightings = { ...state}

          let id = (action.payload["found"])
          delete updatedSightings[id];

          return updatedSightings
        default:
            return state
    }
};

export default sightingReducer;
