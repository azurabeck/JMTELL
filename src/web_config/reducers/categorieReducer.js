const initState = { MSG_SENT: null }

const categorieReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CATEGORIE_CREATED_ERROR': 
            return {
                ...state, Error: 'CATEGORIE CREATION FAILED' , CATEGORIE_SENT: false 
            }
        case 'CATEGORIE_CREATED':
            return {
                ...state, Error: null, CATEGORIE_UPDATED: true
            }
        case 'CATEGORIE_UPDATE_ERROR': 
            return {
                ...state, Error: 'CATEGORIE UPDATE FAILED' , CATEGORIE_UPDATED: false 
            }
        case 'CATEGORIE_UPDATE':
            return {
                ...state, Error: null, CATEGORIE_DELETED: true
            }
        case 'CATEGORIE_DELETE_ERROR': 
            return {
                ...state, Error: 'CATEGORIE DELETE FAILED' , CATEGORIE_DELETED: false 
            }
        case 'CATEGORIE_DELETE':
            return {
                ...state, Error: null , CATEGORIE_DELETED: true 
            }
                
        default:
            return state
    }
}

export default categorieReducer