// const GET_BOOKMARKS = "session/GET_BOOKMARK"
const CREATE_BOOKMARK = "session/CREATE_BOOKMARK"
const REMOVE_BOOKMARK = "session/REMOVE_BOOKMARK"

// const getBookmarks = (sightingId) => ({
//   type: GET_BOOKMARKS,
//   package: sightingId
// })

const addBookmark = (bookmark) => ({
  type: CREATE_BOOKMARK,
  bookmark
})

const removeBookmark = (bookmark) => ({
  type: REMOVE_BOOKMARK,
  bookmark
})

// export const fetchBookmarks = (sightingId) => async (dispatch) => {
//   const res = await fetch(`/api/bookmarks/${sightingId}`);
//   const data = await res.json();
//   dispatch(getBookmarks(data));
// }

export const createBookmark = (bookmark) => async (dispatch) => {
  const res = await fetch(`/api/bookmarks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: bookmark.user_id,
      sighting_id: bookmark.sighting_id
    })
  });
  const data = await res.json();
  dispatch(addBookmark(data));
  return data;
}

export const deleteBookmark = (bookmark) => async (dispatch) => {
  const res = await fetch(`/api/bookmarks/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify({
        user_id: parseInt(bookmark.user_id),
        sighting_id: parseInt(bookmark.sighting_id)
      })
  })
  if (res.ok) {
    const data = await res.json();
    dispatch(removeBookmark(data))
    return
  }
}

const bookmarksReducer = (state = {}, action) => {
  switch (action.type) {
    // case GET_BOOKMARKS: {
    //   const bookmarks = { ...state };

    //   console.log(bookmarks, "inside reducer");
    //   return bookmarks;
    // }
    case REMOVE_BOOKMARK : {
      const bookmarks = { ...state };
      console.log(bookmarks);
      console.log(action.payload);
    }
    default:
      return state;
  }
}


export default bookmarksReducer;
