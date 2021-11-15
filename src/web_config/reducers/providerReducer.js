const initState = { MSG_SENT: null }

const providerReducer = (state = initState, action) => {
    switch(action.type) {
        case 'PROVIDER_CREATED': 
            return {
                ...state,
            }
        case 'PROVIDER_CREATED_ERRO':
            return {
                ...state, Error: action.err,
            }
       case 'PROVIDER_DELETE': 
            return {
                ...state,
            }
        case 'PROVIDER_DELETE_ERRO':
            return {
                ...state, Error: action.err,
        }
        default:
            return state
    }
}

export default providerReducer