const initState = { 
    MSG_SENT: null ,
    filterCategorie: [],
    productCategorie: [{
        categorie: [],
        subCategories: []
    }]
}

const productReducer = (state = initState, action) => {

    switch(action.type) {
        case 'PRODUCT_CREATED_ERROR': 
            return {
                ...state, Error: 'PRODUCT CREATION FAILED' , PRODUCT_SENT: false 
            }
        case 'PRODUCT_CREATED':
            return {
                ...state, Error: null, PRODUCT_UPDATED: true
            }
        case 'PRODUCT_UPDATE_ERROR': 
            return {
                ...state, Error: 'PRODUCT UPDATE FAILED' , PRODUCT_UPDATED: false 
            }
        case 'PRODUCT_UPDATE':
            return {
                ...state, Error: null, PRODUCT_DELETED: true
            }
        case 'PRODUCT_DELETE_ERROR': 
            return {
                ...state, Error: 'PRODUCT DELETE FAILED' , PRODUCT_DELETED: false 
            }
        case 'PRODUCT_DELETE':
            return {
                ...state, Error: null , PRODUCT_DELETED: true 
            }
        case 'SET_PRODUCT_CATEGORIE':
            return {
                ...state, productCategorie: action.productCategorie, Error: null
            }
        case 'PRODUCT_CATEGORIE_FILTER':
            return {
                ...state, filterCategorie: action.filter, Error: null , PRODUCT_DELETED: true 
            }
                
        default:
            return state
    }
}

export default productReducer