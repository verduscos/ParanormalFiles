const CREATE_SIGHTING = "session/CREATE_SIGHTING"
const GET_SIGHTINGS = "session/GET_SIGHTING"
const GET_MORE_SIGHTINGS = "session/GET_MORE_SIGHTINGS"
const EDIT_SIGHTING = "session/EDIT_SIGHTING"
const DELETE_SIGHTING = "session/DELETE_SIGHTING"
const GET_USER_SIGHTINGS = "session/GET_USER_SIGHTINGS"
const GET_USER_FAVORITES = "session/GET_FAVORITES"
const SEARCH = "session/SEARCH"
const GET_CURRENT_SIGHTING = "session/GET_CURRENT_SIGHTING";


const createSighting = (sighting) => ({
  type: CREATE_SIGHTING,
  payload: sighting
})

const getSightings = (sightings) => ({
  type: GET_SIGHTINGS,
  payload: sightings
})

const getMoreSightings = (sightings) => ({
  type: GET_MORE_SIGHTINGS,
  payload: sightings
})

const editSighting = (sighting) => ({
  type: EDIT_SIGHTING,
  payload: sighting
})

const deleteSighting = (sightingId) => ({
  type: DELETE_SIGHTING,
  payload: sightingId
})

const getSightingsByUser = (sightings) => ({
  type: GET_USER_SIGHTINGS,
  payload: sightings
})

const getFavorites = (sightings) => ({
  type: GET_USER_FAVORITES,
  payload: sightings
})

const searchSightings = (searchStr) => ({
  type: SEARCH,
  payload: searchStr
})

<<<<<<< HEAD
export const getAllFavorites = (Id) => async (dispatch) => {
  const response = await fetch(`/api/bookmarks/${Id}`);

  if (response.status >= 400) {
    throw response;
  }

  console.log('LSJFLKSDJLKFJ')
  const data = await response.json();
  dispatch(getFavorites(data));
  return data;
}

export const searchAllSightings = (searchStr) => async (dispatch) => {
  const response = await fetch(`/api/sightings/search/${searchStr}`);
  if (response.status >= 400) {
    throw response
  }

  console.log("HITTING THINK")
  const data = await response.json();
  dispatch(searchSightings(data));
  return data;

}
=======
const getCurrentSighting = (sighting) => ({
  type: GET_CURRENT_SIGHTING,
  payload: sighting
})
>>>>>>> main

export const getAllSightings = () => async (dispatch) => {
  const response = await fetch(`/api/sightings/`);
  if (response.status >= 400) {
    throw response;
  }
  const data = await response.json();
  dispatch(getSightings(data.sightings));
  return data;
}

export const getAdditionalSightings = (id) => async (dispatch) => {
  const response = await fetch(`/api/sightings/additional/${id}`);
  const data = await response.json();
  dispatch(getMoreSightings(data.sightings));
  return data;
}

export const createASighting = (payload) => async (dispatch) => {
  const response = await fetch(`/api/sightings/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: payload.user_id,
      date: payload.date,
      title: payload.title,
      description: payload.description,
      category: payload.category,
      location: payload.location,
      image_url: payload.url
    })
  })
  const data = await response.json()
  if (data.errors) {
    return data;
  } else {
    dispatch(createSighting(data));
    return data;
  }
}

export const updateSighting = (payload) => async (dispatch) => {
  const response = await fetch(`/api/sightings/${payload.sighting_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: payload.user_id,
      title: payload.title,
      description: payload.description,
      category: payload.category,
      image_url: payload.url
    })
  })

  const data = await response.json()
  if (data.errors) {
    return data;
  } else {
    dispatch(editSighting(data));
    return data;
  }
}

export const deleteASighting = (sightingId) => async (dispatch) => {
  const response = await fetch(`/api/sightings/${sightingId}`, {
    method: "DELETE"
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteSighting(data));
    return;
  }
}

export const getAllUserSightings = (userId) => async (dispatch) => {
  const response = await fetch(`/api/sightings/user/${userId}`);
  if (response.status >= 400) {
    throw response;
  } else {
    const data = await response.json();
    dispatch(getSightingsByUser(data.sightings));
    return data;
  }
}

export const getAllFavorites = (Id) => async (dispatch) => {
  const response = await fetch(`/api/likes/${Id}`);
  if (response.status >= 400) {
    throw response;
  }
  const data = await response.json();
  dispatch(getFavorites(data));
  return data;
}

export const getCurrentSightingThunk = (sighting) => async (dispatch) => {
  console.log("INSDIE OF THE THUNK")
  dispatch(getCurrentSighting(sighting));
  return sighting;
}

export const searchAllSightings = (searchStr) => async (dispatch) => {
  const response = await fetch(`/api/sightings/search/${searchStr}`);
  if (response.status >= 400) {
    throw response;
  }
  const data = await response.json();
  dispatch(searchSightings(data));
  return data;
}

const sightingReducer = (state = { all: {}, exhausted: false }, action) => {
  switch (action.type) {
    case GET_SIGHTINGS:
      const sightings = { ...state }
      action.payload.forEach(sighting => {
        sightings.all[sighting.id] = sighting;
      })
      return sightings;

    case GET_MORE_SIGHTINGS: {
      const sightings = { ...state };
      if (action.payload.length < 1) {
        sightings.exhausted = true;
        return sightings;
      }

      action.payload.forEach(sighting => {
        sightings.all[sighting.id] = sighting;
      })
      return sightings;
    }

    case SEARCH:
      const search = { all: {}, exhausted: false }
      if (action.payload["error"]) {
        return search;
      } else  {
        action.payload["sightings"].forEach(sighting => {
          search.all[sighting.id] = sighting
        })
        return search;
      }

<<<<<<< HEAD
    case GET_FAVORITES:
      let favorites = {}

      console.log('HERER')


      if (action.payload["bookmarks"]) {
        action.payload["bookmarks"].forEach(sighting => {
          favorites[sighting.id] = sighting;
        })
      }

      console.log(action.payload, 'YOYOMA')
=======
    case GET_USER_FAVORITES:
      let favorites = { }
      if (action.payload["likes"]) {
        action.payload["likes"].forEach(sighting => {
          favorites[sighting.id] = sighting;
        })
      }
>>>>>>> main
      return favorites

    case GET_USER_SIGHTINGS:
      const userSightings = { all: {} }
      action.payload.forEach(sighting => {
        userSightings.all[sighting.id] = sighting
      })
      return { ...userSightings }

    case CREATE_SIGHTING:
      state[action.payload.id] = action.payload
      return { ...state }

    case EDIT_SIGHTING:
      let updated = { ...state }
      updated[action.payload.id] = action.payload
      return { ...updated }

    case DELETE_SIGHTING:
      let updatedSightings = { ...state }
      let id = (action.payload["found"])
      delete updatedSightings[id];
      return updatedSightings


      case GET_CURRENT_SIGHTING: {
        console.log("YOYOMA")
        const current = { ...state };
        current["current"] = action.payload;
        console.log("YOYOYO@@@")
        return current;
      }
    default:
      return state
  }
};

export default sightingReducer;
