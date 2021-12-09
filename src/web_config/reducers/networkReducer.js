const initState = { MSG_SENT: null , textCollection: {} }

const textReducer = (state = initState, action) => {
    
    switch(action.type) {
        case 'NETWORK_LINK_UPDATE': 
            return {
                ...state, Error: 'Login failed' , MSG_SENT: false 
            }
        case 'NETWORK_LINK_UPDATE_ERROR':
            return {
                ...state, Error: null, MSG_SENT: true
            }
        default:
            return state
    }
}

export default textReducer