export const createProcuct = (product) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();


        firestore.collection('products').add({
            ...product , 
            spotlight: product.spotlight, 
            time: new Date() 
        })
       
        
        .then(() => {
            dispatch({ type: 'PRODUCT_CREATED', product })
        }).catch((err) => {
            dispatch({type: 'PRODUCT_CREATED_ERRO', err})
        })
        
    }
}

export const updateProcuct = (product) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        firestore.collection('products').doc(product.id).update({
            ...product , 
            spotlight: product.spotlight, 
            time: new Date() 
        })
       
        
        .then(() => {
            dispatch({ type: 'PRODUCT_UPDATE', product })
        }).catch((err) => {
            dispatch({type: 'PRODUCT_UPDATE_ERRO', err})
        })
        
    }
}

export const deleteProcuct = (product) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        firestore.collection('products').doc(product.id).delete()     
        .then(() => {
            dispatch({ type: 'PRODUCT_DELETE', product })
        }).catch((err) => {
            dispatch({type: 'PRODUCT_DELETE_ERRO', err})
        })
        
    }
}


export const filterCategorie = (filter) => {
    return {
      type: 'PRODUCT_CATEGORIE_FILTER',
      filter
    }
}