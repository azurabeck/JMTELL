const initState = {
    posts: [{}]
}
const postReducer = (state = initState, action) => {
    switch (action.type) { 
        case 'CREATE_POST':
            console.log('create post', action.post)
            return state;
        case 'CREATE_POST_ERROR':
            console.log('create post error', action.err)
            return state;
        case 'EDIT_POST':
            console.log('edit_post', action.post)
            return state;
        case 'EDIT_POST_ERROR':
            console.log('edit_post', action.err)
            return state;
        case 'DELETE_POST':
            console.log('delete_post', action.firebaseId)
            return state;
        case 'DELETE_POST_ERROR':
            console.log('delete_post', action.err)
            return state;
        default:
            return state
     }
}

export default postReducer