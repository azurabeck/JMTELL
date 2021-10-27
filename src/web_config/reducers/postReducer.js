const initState = {
    posts: [
        {id: '1', title: 'help me find', content: 'Magna eiusmod labore nulla veniam deserunt excepteur.' },
        {id: '2', title: 'help me fdsfsd', content: 'Magna eiusmod labore nulla veniam deserunt excepteur.' },
        {id: '3', title: 'help me rwe', content: 'Magna eiusmod labore nulla veniam deserunt excepteur.' }
    ]
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