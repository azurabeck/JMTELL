import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import HttpsRedirect from 'react-https-redirect';

import thunk from 'redux-thunk'

import { reduxFirestore , getFirestore } from 'redux-firestore'
import { reactReduxFirebase , getFirebase } from 'react-redux-firebase'
import fbConfig from './web_config/fbConfig'
import rootReducer from './web_config/reducers/rootReducer'
import Routes from './Routes';
import './main_style.scss';

const store = createStore(rootReducer, 
     compose (
          applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
          reduxFirestore(fbConfig),
          reactReduxFirebase(fbConfig, {attachAuthIsReady: true , useFirestoreForProfile: true, userProfile: 'users'})
     )
);

store.firebaseAuthIsReady.then(() => {
     ReactDOM.render( 
          <HttpsRedirect>
               <Provider store={store}>
                         <BrowserRouter><Routes /></BrowserRouter>
               </Provider>
          </HttpsRedirect>, document.getElementById('root'));
})







