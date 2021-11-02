const initState = { posts: [{}] }

const postReducer = (state = initState, action) => {
    switch (action.type) { 
        case 'CREATE_POST':
            return {
                ...state, ERROR: null , CREATE_SUCESS: true
            }
        case 'CREATE_POST_ERROR':
            return {
                ...state, ERROR: 'Create post failed' , CREATE_SUCESS: false
            }
        case 'EDIT_POST':
            return {
                ...state, ERROR: null , UPDATE_SUCESS: true
            }
        case 'EDIT_POST_ERROR':
            return {
                ...state, ERROR: 'Update post failed' , UPDATE_SUCESS: false
            }
        case 'DELETE_POST':
            return {
                ...state, ERROR: null , DELETE_SUCESS: true
            }
        case 'DELETE_POST_ERROR':
            return {
                ...state, ERROR: 'Delete post failed' , DELETE_SUCESS: false
            }
        default:
            return state
     }
}

export default postReducer