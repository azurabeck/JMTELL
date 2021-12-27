const initState = { MSG_SENT: null , seller: {} , phone: {} }

const employeesReducer = (state = initState, action) => {
    
    switch(action.type) {
        case 'EMPLOYEES_ADD': 
            return {
                ...state, Error: 'Login failed' , MSG_SENT: false 
            }
        case 'EMPLOYEES_ADD_ERROR':
            return {
                ...state, Error: null, MSG_SENT: true
            }
        case 'EMPLOYEES_UPDATE': 
            return {
                ...state, Error: 'Login failed' , MSG_SENT: false 
            }
        case 'EMPLOYEES_UPDATE_ERROR':
            return {
                ...state, Error: null, MSG_SENT: true
            }
        case 'EMPLOYEES_DELETE': 
            return {
                ...state, Error: 'Login failed' , MSG_SENT: false 
            }
        case 'EMPLOYEES_DELETE_ERROR':
            return {
                ...state, Error: null, MSG_SENT: true
            }

        // PHONE
        case 'PHONE_ADD': 
            return {
                ...state, Error: 'Login failed' , MSG_SENT: false 
            }
        case 'PHONE_ADD_ERROR':
            return {
                ...state, Error: null, MSG_SENT: true
            }
        case 'PHONE_UPDATE': 
            return {
                ...state, Error: 'Login failed' , MSG_SENT: false 
            }
        case 'PHONE_UPDATE_ERROR':
            return {
                ...state, Error: null, MSG_SENT: true
            }
        case 'PHONE_DELETE': 
            return {
                ...state, Error: 'Login failed' , MSG_SENT: false 
            }
        case 'PHONE_DELETE_ERROR':
            return {
                ...state, Error: null, MSG_SENT: true
            }

        default:
            return state
    }
}

export default employeesReducer