export const createCategorie = (categories) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        firestore.collection('categories').add({
            ...categories 
        })
        .then(function(docRef) {
            firestore.collection('categories').doc(docRef.id).update({
                id: docRef.id,
            })
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
        const id = categories.id.toString().replace(/\s/g, '')

        firestore.collection('categories').doc(id).update({
            ...categories 
        })
       
        
        .then(() => {
            dispatch({ type: 'CATEGORIE_UPDATE' })
        }).catch((err) => {
            console.log(err)
            dispatch({type: 'CATEGORIE_UPDATE_ERRO', err})
        })
        
    }
}

export const deleteCategorie = (categorie) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        firestore.collection('categories').doc(categorie).delete()     
        .then(() => {
            dispatch({ type: 'CATEGORIE_DELETE' })
        }).catch((err) => {
            dispatch({type: 'CATEGORIE_DELETE_ERRO', err})
        })
        
    }
}