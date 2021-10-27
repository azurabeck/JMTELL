const initState = { MSG_SENT: null }

const clientReducer = (state = initState, action) => {
    switch(action.type) {
        case 'MSG_ERROR': 
            return {
                ...state, Error: 'Login failed' , MSG_SENT: false 
            }
        case 'MSG_SUCCESS':
            return {
                ...state, Error: null, MSG_SENT: true
            }
        default:
            return state
    }
}

export default clientReducer