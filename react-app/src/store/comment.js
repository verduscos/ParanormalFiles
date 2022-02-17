const GET_COMMENTS = "session/GET_COMMENTS"

const getComments = (comments) => ({
    type: GET_COMMENTS,
    payload: comments
})


export const getALLComments = (sightingId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${sightingId}`)

        if (response.status >= 400) {
            throw response
        }

        const data = await response.json();
        dispatch(getComments(data));
        return data;

}


const commentsReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_COMMENTS:
            let comments = {}

            // action.payload.forEach(comment => {
            //     comments[comment.id] = comment
            // })

            return { ...state, ...action.payload.comments}
        default:
            return state;
    }
}

export default commentsReducer
