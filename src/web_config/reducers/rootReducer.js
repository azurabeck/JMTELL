import authReducer from './authReducer'
import postReducer from './postReducer'
import clientReducer from './clientReducer'
import textReducer from './textReducer'
import categorietReducer from './categorieReducer'
import networkReducer from './networkReducer'
import productReducer from './productReducer'
import providerReducer from './providerReducer'
import { firestoreReducer } from 'redux-firestore'
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer, 
    client: clientReducer,
    text: textReducer,
    product: productReducer,
    provider: providerReducer,
    categorie: categorietReducer,
    network: networkReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer