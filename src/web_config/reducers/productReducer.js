const initState = { MSG_SENT: null }

const productReducer = (state = initState, action) => {
    switch(action.type) {
        case 'PRODUCT_CREATED_ERROR': 
            return {
                ...state, Error: 'PRODUCT CREATION FAILED' , PRODUCT_SENT: false 
            }
        case 'PRODUCT_CREATED':
            return {
                ...state, Error: null, PRODUCT_SENT: true
            }
        case 'PRODUCT_UPDATE_ERROR': 
            return {
                ...state, Error: 'PRODUCT UPDATE FAILED' , PRODUCT_SENT: false 
            }
        case 'PRODUCT_UPDATE':
            return {
                ...state, Error: null, PRODUCT_SENT: true
            }
        default:
            return state
    }
}

export default productReducer