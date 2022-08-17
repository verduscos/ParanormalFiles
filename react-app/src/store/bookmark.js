const GET_BOOKMARKS = "session/GET_BOOKMARK"

const getBookmarks = (sightingId) => ({
  type: GET_BOOKMARKS,
  package: sightingId
})

export const fetchBookmarks = (sightingId) => async (dispatch) => {
  const res = await fetch(`/api/bookmarks/${sightingId}`);
  const data = await res.json();
  dispatch(getBookmarks(data));
}

const bookmarksReducer = (state = {}, action) => {
  switch(action.type) {
    case GET_BOOKMARKS: {
      const bookmarks = { ...state };

      console.log(bookmarks, "inside reducer");
    }
  }
}
