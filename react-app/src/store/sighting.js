const GET_SIGHTING = "session/GET_SIGHTING";

const getSightings = (sightings) => ({
    type: GET_SIGHTING,
    payload: sightings
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


const sightingReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SIGHTING:
          let sightings = {}

          action.payload.forEach(sighting => {
            sightings[sighting.id] = sighting
          })

          return { ...state, ...sightings }

        default:
            return state
    }
};

export default sightingReducer;
