export const createCategorie = (categories) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        firestore.collection('categories').add({
            ...categories 
        })
       
        
        .then(() => {
            dispatch({ type: 'CATEGORIE_CREATED', categories })
        }).catch((err) => {
            dispatch({type: 'CATEGORIE_CREATED_ERRO', err})
        })
        
    }
}

export const updateCategorie = (categories) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        firestore.collection('categories').doc(categories.id).update({
            ...categories 
        })
       
        
        .then(() => {
            dispatch({ type: 'CATEGORIE_UPDATE', categories })
        }).catch((err) => {
            dispatch({type: 'CATEGORIE_UPDATE_ERRO', err})
        })
        
    }
}

export const deleteCategorie = (categories) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        firestore.collection('categories').doc(categories.id).delete()     
        .then(() => {
            dispatch({ type: 'CATEGORIE_DELETE', categories })
        }).catch((err) => {
            dispatch({type: 'CATEGORIE_DELETE_ERRO', err})
        })
        
    }
}