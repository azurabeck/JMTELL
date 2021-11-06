import authReducer from './authReducer'
import postReducer from './postReducer'
import clientReducer from './clientReducer'
import categorietReducer from './categorieReducer'
import productReducer from './productReducer'
import { firestoreReducer } from 'redux-firestore'
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer, 
    client: clientReducer,
    product: productReducer,
    categorie: categorietReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer