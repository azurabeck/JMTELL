const initState = { MSG_SENT: null , textCollection: {} }

const textReducer = (state = initState, action) => {
    
    switch(action.type) {
        case 'TEXT_ADD_ERROR': 
            return {
                ...state, Error: 'Login failed' , MSG_SENT: false 
            }
        case 'TEXT_ADD':
            return {
                ...state, Error: null, MSG_SENT: true
            }
        case 'UPDATE_FIELD':
                return {
                    ...state, textCollection: action.text, Error: null, MSG_SENT: true
                }
        default:
            return state
    }
}

export default textReducer