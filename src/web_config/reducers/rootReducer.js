import authReducer from './authReducer'
import postReducer from './postReducer'
import { firestoreReducer } from 'redux-firestore'
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer, 
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer