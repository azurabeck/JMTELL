export const createProvider = (providers) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();
        firestore.collection('providers').add({
            ...providers, 
            time: new Date() 
        })        
        .then(function(docRef) {
            firestore.collection('posts').doc(docRef.id).update({
                id: docRef.id,
            })
        })
               
        .then(() => {
            dispatch({ type: 'PROVIDER_CREATED' })
        }).catch((err) => {
            dispatch({type: 'PROVIDER_CREATED_ERRO', err})
        })
        
    }
}

export const deleteProvider = (provider) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        firestore.collection('providers').doc(provider.id).delete()     
        .then(() => {
            dispatch({ type: 'PROVIDER_DELETE' })
        }).catch((err) => {
            dispatch({type: 'PROVIDER_DELETE_ERRO', err})
        })
        
    }
}
