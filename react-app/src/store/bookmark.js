const CREATE_BOOKMARK = "session/CREATE_BOOKMARK"
const REMOVE_BOOKMARK = "session/REMOVE_BOOKMARK"

const addBookmark = (bookmark) => ({
  type: CREATE_BOOKMARK,
  bookmark
})

const removeBookmark = (bookmark) => ({
  type: REMOVE_BOOKMARK,
  bookmark
})

export const createBookmark = (bookmark) => async (dispatch) => {
  const res = await fetch(`/api/bookmarks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: bookmark.userId,
      sighting_id: bookmark.sightingId
    })
  });
  const data = await res.json();
  dispatch(addBookmark(data));
}

export const deleteBookmark = (bookmark) => async (dispatch) => {
  const res = await fetch(`/api/bookmarks/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify({
        user_id: parseInt(bookmark["userId"]),
        sighting_id: parseInt(bookmark["sightingId"])
      })
  })
    const data = await res.json();
    dispatch(removeBookmark(data))
}

const bookmarksReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BOOKMARK : {
      const bookmarks = { ...state };
      return bookmarks;
    }
    case REMOVE_BOOKMARK : {
      const bookmarks = { ...state };
      return bookmarks;
    }
    default:
      return state;
  }
}


export default bookmarksReducer;
