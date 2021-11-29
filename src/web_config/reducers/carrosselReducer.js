const initState = { MSG_SENT: null , textCollection: {} }

const textReducer = (state = initState, action) => {
    
    switch(action.type) {
        case 'CARROSSEL_ADD': 
            return {
                ...state, Error: 'Login failed' , MSG_SENT: false 
            }
        case 'CARROSSEL_ADD_ERROR':
            return {
                ...state, Error: null, MSG_SENT: true
            }
        default:
            return state
    }
}

export default textReducer