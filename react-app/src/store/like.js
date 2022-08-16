const GET_BOOKMARKS = "session/GET_BOOKMARKS"
const ADD_BOOKMARK = "session/ADD_BOOKMARK"
const REMOVE_BOOKMARK = "session/REMOVE_BOOKMARK"

const getBookmarks = (sightingId) => ({
  type:GET_BOOKMARKS,
  payload: sightingId
})

const bookmarkSighting = (sighting) => ({
  type: ADD_BOOKMARK,
  payload: sighting
})

const removeBookmarkSighting = (sighting) => ({
  type: REMOVE_BOOKMARK,
  payload: sighting
})


export const removeBookmark = (payload) => async (dispatch) => {
  const response = await fetch(`/api/bookmarks/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify({
        user_id: parseInt(payload.user_id),
        sighting_id: parseInt(payload.sighting_id)
      })
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(removeBookmarkSighting(data))
    return
  }
}

export const getUserBookmarks = (sightingId) => async (dispatch) => {
  const response = await fetch(`/api/bookmarks/${sightingId}`)

  if(response.status >= 400) {
    throw response
  }

  const data = await response.json();

  dispatch(getBookmarks(data));
  return data;
}

export const addBookmark = (payload) => async (dispatch) => {
  const response = await fetch(`/api/bookmarks/`, {
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

  dispatch(bookmarkSighting(data));
  return data;
}



const likesReducer = (state = {}, action) => {
  switch (action.type){
    case GET_BOOKMARKS:
      let bookmarks = { ...state }

      action.payload.bookmarks.forEach(bookmarked => {
        bookmarks[bookmarked.id] = bookmarked
      })

      return { ...bookmarks }

    case REMOVE_BOOKMARK:
      let likess = { ...state }
      let id = action.payload["deleted"]

      delete likess[id];
      return likess

    case ADD_BOOKMARK:
      let like = { ...state }

      like[action.payload.bookmarks.id] = action.payload.bookmarks;

      return like

    default:
      return state;
  }
}


export default likesReducer;
